import fs from "fs";
import readline from "readline";
import { google } from "googleapis";
import * as moduleRepository from "../../data/module-repository.js";
import * as mentorRepository from "../../data/mentor-repository.js";
import * as studentRepository from "../../data/student-repository.js";
import * as homeworkRepository from "../../data/homework-repository.js";
import * as examRepository from "../../data/exam-repository.js";
import * as studentHomeworkRepository from "../../data/student-homework-repository.js";
import * as studentExamRepository from "../../data/student-exam-repository.js";

const SCOPES = [
  "https://www.googleapis.com/auth/classroom.courses.readonly",
  "https://www.googleapis.com/auth/classroom.profile.emails",
  "https://www.googleapis.com/auth/classroom.profile.photos",
  "https://www.googleapis.com/auth/classroom.rosters",
  "https://www.googleapis.com/auth/classroom.rosters.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.me",
  "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
  "https://www.googleapis.com/auth/classroom.coursework.students",
  "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
  "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
  "https://www.googleapis.com/auth/classroom.student-submissions.students.readonly",
];

const TOKEN_PATH = "./src/service/classroom-service/token.json";

fs.readFile(
  "./src/service/classroom-service/credentials.json",
  (err, content) => {
    authorize(JSON.parse(content), getModule);
    authorize(JSON.parse(content), getMentors);
    authorize(JSON.parse(content), getStudents);
    authorize(JSON.parse(content), getHomeworks);
    authorize(JSON.parse(content), getExams);
    authorize(JSON.parse(content), getHomeworkGrades);
    authorize(JSON.parse(content), getExamGrades);
  }
);

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// get Module
function getModule(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  classroom.courses.list(
    {
      courseStates: "ACTIVE",
    },
    (err, res) => {
      const activeCourses = res.data.courses;
      activeCourses.map((activeCourse) => {
        moduleRepository.getModule(activeCourse.id).then((activeModule) => {
          if (activeModule) {
            moduleRepository.updateModule(activeModule.id, {
              id: activeCourse.id,
              name: activeCourse.name,
              start_date: activeCourse.creationTime,
              status: activeCourse.courseState,
            });
          } else {
            moduleRepository.createModule({
              id: activeCourse.id,
              name: activeCourse.name,
              start_date: activeCourse.creationTime,
              status: activeCourse.courseState,
            });
          }
        });
      });
    }
  );
}

// get Mentors
function getMentors(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.teachers.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const mentors = res.data.teachers;

          if (mentors && mentors.length) {
            mentors.map((mentor) => {
              mentorRepository
                .isUserExisting(mentor.profile.emailAddress)
                .then((isExisting) => {
                  if (isExisting.permitted) {
                    mentorRepository.updateMentor(mentor.userId, {
                      id: mentor.userId,
                      first_name: mentor.profile.name.givenName,
                      last_name: mentor.profile.name.familyName,
                      email: mentor.profile.emailAddress,
                    });
                  } else {
                    mentorRepository.createMentor({
                      id: mentor.userId,
                      first_name: mentor.profile.name.givenName,
                      last_name: mentor.profile.name.familyName,
                      email: mentor.profile.emailAddress,
                    });
                  }
                });
            });
          }
        }
      );
    }
  });
}

// get Students
function getStudents(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.students.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const students = res.data.students;

          if (students && students.length) {
            students.map((student) => {
              studentRepository
                .isUserExisting(student.profile.emailAddress)
                .then((isExisting) => {
                  if (isExisting) {
                    studentRepository.updateStudent(student.userId, {
                      id: student.userId,
                      first_name: student.profile.name.givenName,
                      last_name: student.profile.name.familyName,
                      email: student.profile.emailAddress,
                    });
                  } else {
                    studentRepository.createStudent({
                      id: student.userId,
                      first_name: student.profile.name.givenName,
                      last_name: student.profile.name.familyName,
                      email: student.profile.emailAddress,
                    });
                  }
                });
            });
          }
        }
      );
    }
  });
}

// get Homeworks
function getHomeworks(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.courseWork.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const homeworks = res.data.courseWork;

          if (homeworks && homeworks.length) {
            homeworks
              .filter(
                (homework) => !homework.title.toLowerCase().includes("quiz")
              )
              .filter(
                (homework) => !homework.title.toLowerCase().includes("exam")
              )
              .map((homework) => {
                homeworkRepository
                  .isHomeworkExisting(homework.id)
                  .then((isExisting) => {
                    if (isExisting) {
                      homeworkRepository.updateHomework(homework.id, {
                        id: homework.id,
                        name: homework.title,
                        assignment_date: homework.creationTime,
                        deadline: new Date(
                          homework.dueDate.year,
                          homework.dueDate.month - 1,
                          homework.dueDate.day,
                          homework.dueTime.hours,
                          homework.dueTime.minutes + 120
                        ),
                        ModuleId: activeModule.id,
                      });
                    } else {
                      homeworkRepository.createHomework({
                        id: homework.id,
                        name: homework.title,
                        assignment_date: homework.creationTime,
                        deadline: new Date(
                          homework.dueDate.year,
                          homework.dueDate.month - 1,
                          homework.dueDate.day,
                          homework.dueTime.hours,
                          homework.dueTime.minutes + 120
                        ),
                        ModuleId: activeModule.id,
                      });
                    }
                  });
              });
          }
        }
      );
    }
  });
}

// get Exams
function getExams(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.courseWork.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const exams = res.data.courseWork;

          if (exams && exams.length) {
            exams
              .filter((exam) => {
                if (exam.title.toLowerCase().includes("quiz")) {
                  return exam;
                } else if (exam.title.toLowerCase().includes("exam")) {
                  return exam;
                }
              })
              .map((exam) => {
                examRepository.isExamExisting(exam.id).then((isExisting) => {
                  if (isExisting) {
                    examRepository.updateExam(exam.id, {
                      id: exam.id,
                      name: exam.title,
                      date: exam.creationTime,
                      deadline: new Date(
                        exam.dueDate.year,
                        exam.dueDate.month - 1,
                        exam.dueDate.day,
                        exam.dueTime.hours,
                        exam.dueTime.minutes + 120
                      ),
                      ModuleId: activeModule.id,
                    });
                  } else {
                    examRepository.createExam({
                      id: exam.id,
                      name: exam.title,
                      date: exam.creationTime,
                      deadline: new Date(
                        exam.dueDate.year,
                        exam.dueDate.month - 1,
                        exam.dueDate.day,
                        exam.dueTime.hours,
                        exam.dueTime.minutes + 120
                      ),
                      ModuleId: activeModule.id,
                    });
                  }
                });
              });
          }
        }
      );
    }
  });
}

// get HomeworkGrades
function getHomeworkGrades(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.courseWork.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const homeworks = res.data.courseWork;

          if (homeworks && homeworks.length) {
            homeworks
              .filter(
                (homework) => !homework.title.toLowerCase().includes("quiz")
              )
              .filter(
                (homework) => !homework.title.toLowerCase().includes("exam")
              )
              .map((homework) => {
                homeworkRepository
                  .isHomeworkExisting(homework.id)
                  .then((isExisting) => {
                    if (isExisting) {
                      classroom.courses.courseWork.studentSubmissions.list(
                        {
                          courseId: activeModule.id,
                          courseWorkId: homework.id,
                        },
                        (err, res) => {
                          const grades = res.data.studentSubmissions;

                          if (grades && grades.length) {
                            grades.map((grade) => {
                              studentHomeworkRepository
                                .isStudentHomeworkExisting(grade.id)
                                .then((isExisting) => {
                                  if (isExisting) {
                                    studentHomeworkRepository.updateStudentHomework(
                                      grade.id,
                                      {
                                        StudentId: grade.userId,
                                        HomeworkId: grade.courseWorkId,
                                        grade: grade.assignedGrade,
                                        status: grade.state,
                                      }
                                    );
                                  } else {
                                    studentHomeworkRepository.createStudentHomework(
                                      {
                                        id: grade.id,
                                        StudentId: grade.userId,
                                        HomeworkId: grade.courseWorkId,
                                        grade: grade.assignedGrade,
                                        status: grade.state,
                                      }
                                    );
                                  }
                                });
                            });
                          }
                        }
                      );
                    }
                  });
              });
          }
        }
      );
    }
  });
}

// get ExamGrades
function getExamGrades(auth) {
  const classroom = google.classroom({ version: "v1", auth });

  moduleRepository.getActiveModule().then((activeModule) => {
    if (activeModule != null) {
      classroom.courses.courseWork.list(
        {
          courseId: activeModule.id,
        },
        (err, res) => {
          const exams = res.data.courseWork;

          if (exams && exams.length) {
            exams
              .filter((exam) => {
                if (exam.title.toLowerCase().includes("quiz")) {
                  return exam;
                } else if (exam.title.toLowerCase().includes("exam")) {
                  return exam;
                }
              })
              .map((exam) => {
                examRepository.isExamExisting(exam.id).then((isExisting) => {
                  if (isExisting) {
                    classroom.courses.courseWork.studentSubmissions.list(
                      {
                        courseId: activeModule.id,
                        courseWorkId: exam.id,
                      },
                      (err, res) => {
                        const grades = res.data.studentSubmissions;

                        if (grades && grades.length) {
                          grades.map((grade) => {
                            studentExamRepository
                              .isStudentExamExisting(grade.id)
                              .then((isExisting) => {
                                if (isExisting) {
                                  studentExamRepository.updateStudentExam(
                                    grade.id,
                                    {
                                      StudentId: grade.userId,
                                      ExamId: grade.courseWorkId,
                                      grade: grade.assignedGrade,
                                      status: grade.state,
                                    }
                                  );
                                } else {
                                  studentExamRepository.createStudentExam({
                                    id: grade.id,
                                    StudentId: grade.userId,
                                    ExamId: grade.courseWorkId,
                                    grade: grade.assignedGrade,
                                    status: grade.state,
                                  });
                                }
                              });
                          });
                        }
                      }
                    );
                  }
                });
              });
          }
        }
      );
    }
  });
}
