import Student from "../models/student-model.js";
import Mentor from "../models/mentor-model.js";
import Group from "../models/group-model.js";
import StudentGroup from "../models/student-group-model.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

// GET Grades of Student
export const getGradesOfStudent = async (pStudentId) => {
  try {
    const [studentGrades, metadata] = await sequelize.query(
      `SELECT s.id, s.first_name, s.last_name, sh.grade, h.name, h.assignment_date as date, "Homework" as type
      FROM himentorsdb.student as s
      join himentorsdb.studenthomework as sh 
      on s.id = sh.StudentId 
      join himentorsdb.homework as h
      on  sh.HomeworkId= h.id
      where s.id=${pStudentId}
      union
      SELECT s.id, s.first_name, s.last_name, sl.participate_status*100, l.name, l.date, "Lesson" as type
      FROM himentorsdb.student as s
      join himentorsdb.studentlesson as sl 
      on s.id = sl.StudentId 
      join himentorsdb.lesson as l
      on  sl.LessonId= l.id
      where s.id=${pStudentId}
      union
      SELECT s.id, s.first_name, s.last_name, se.grade, e.name, e.date, "Exam" as type
      FROM himentorsdb.student as s
      join himentorsdb.studentexam as se 
      on s.id = se.StudentId 
      join himentorsdb.exam as e
      on  se.ExamId= e.id
      where s.id=${pStudentId}
      order by id, date`
    );

    return await studentGrades;
  } catch (error) {
    console.log(error);
  }
};

// GET Students of Mentor
export const getStudentsOfMentor = async (pUser) => {
  try {
    const relevantMentor = await Mentor.findOne({
      where: { email: pUser.email },
    });
    const relevantGroup = await Group.findOne({
      where: { MentorId: relevantMentor.id },
    });
    const studentsWithId = await StudentGroup.findAll({
      where: { GroupId: relevantGroup.id },
    });

    const studentList = await Promise.all(
      studentsWithId.map(async (student) => {
        return await Student.findByPk(student.StudentId);
      })
    );

    return await studentList;
  } catch (error) {
    console.log(error);
  }
};

// GET all students
export const getStudents = async () => {
  try {
    return await Student.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a movie
export const getStudent = async (pId) => {
  try {
    return await Student.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudent = async (pStudent) => {
  try {
    return await Student.create(pStudent);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudent = async (pId, pStudent) => {
  try {
    // return await Student.update(pStudent, {
    //   where: { id: pId },
    // });
    let student = await Student.findByPk(pId);
    student.set({
      first_name: pStudent.first_name,
      last_name: pStudent.last_name,
      gender: pStudent.gender,
    });
    return await student.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudent = async (pId) => {
  try {
    await Student.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
