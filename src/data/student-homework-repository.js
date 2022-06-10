import StudentHomework from "../models/student-homework-model.js";

// GET all StudentHomeworks
export const getStudentHomeworks = async () => {
  try {
    return await StudentHomework.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a StudentHomework
export const getStudentHomework = async (pId) => {
  try {
    return await StudentHomework.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudentHomework = async (pStudentHomework) => {
  try {
    return await StudentHomework.create(pStudentHomework);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudentHomework = async (pId, pStudentHomework) => {
  try {
    // return await StudentHomework.update(pStudentHomework, {
    //   where: { id: pId },
    // });
    let studentHomework = await StudentHomework.findByPk(pId);
    studentHomework.set({
      StudentId: pStudentHomework.StudentId,
      HomeworkId: pStudentHomework.HomeworkId,
      delivery_date: pStudentHomework.delivery_date,
      check_date: pStudentHomework.check_date,
      grade: pStudentHomework.grade,
    });
    return await studentHomework.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudentHomework = async (pId) => {
  try {
    await StudentHomework.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
