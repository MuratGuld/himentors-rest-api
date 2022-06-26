import StudentHomework from "../models/student-homework-model.js";

// CHECK
export async function isStudentHomeworkExisting(pId) {
  const emailCount = await StudentHomework.count({
    where: { id: pId },
  });

  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
}

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
    let studentHomework = await StudentHomework.findByPk(pId);
    studentHomework.set({
      StudentId: pStudentHomework.StudentId,
      HomeworkId: pStudentHomework.HomeworkId,
      grade: pStudentHomework.grade,
      status: pStudentHomework.status,
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
