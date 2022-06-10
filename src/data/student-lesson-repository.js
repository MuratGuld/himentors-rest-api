import StudentLesson from "../models/student-lesson-model.js";

// GET all Student Lessons
export const getStudentLessons = async () => {
  try {
    return await StudentLesson.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a Student Lesson
export const getStudentLesson = async (pId) => {
  try {
    return await StudentLesson.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudentLesson = async (pStudentLesson) => {
  try {
    return await StudentLesson.create(pStudentLesson);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudentLesson = async (pId, pStudentLesson) => {
  try {
    // return await StudentLesson.update(pStudentLesson, {
    //   where: { id: pId },
    // });
    let studentLesson = await StudentLesson.findByPk(pId);
    studentLesson.set({
      StudentId: pStudentLesson.StudentId,
      LessonId: pStudentLesson.LessonId,
      participate_status: pStudentLesson.participate_status,
    });
    return await studentLesson.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudentLesson = async (pId) => {
  try {
    await StudentLesson.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
