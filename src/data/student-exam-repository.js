import StudentExam from "../models/student-exam-model.js";

// GET all StudentExams
export const getStudentExams = async () => {
  try {
    return await StudentExam.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a StudentExam
export const getStudentExam = async (pId) => {
  try {
    return await StudentExam.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudentExam = async (pStudentExam) => {
  try {
    return await StudentExam.create(pStudentExam);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudentExam = async (pId, pStudentExam) => {
  try {
    // return await StudentExam.update(pStudentExam, {
    //   where: { id: pId },
    // });
    let studentExam = await StudentExam.findByPk(pId);
    studentExam.set({
      StudentId: pStudentExam.StudentId,
      ExamId: pStudentExam.ExamId,
      grade: pStudentExam.grade,
    });
    return await studentExam.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudentExam = async (pId) => {
  try {
    await StudentExam.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
