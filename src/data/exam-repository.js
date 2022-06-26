import Exam from "../models/exam-model.js";

// CHECK
export async function isExamExisting(pId) {
  const emailCount = await Exam.count({
    where: { id: pId },
  });

  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
}

// GET all Exams
export const getExams = async () => {
  try {
    return await Exam.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a Exam
export const getExam = async (pId) => {
  try {
    return await Exam.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createExam = async (pExam) => {
  try {
    return await Exam.create(pExam);
  } catch (error) {
    console.log(error);
  }
};

// PUT by Id
export const updateExam = async (pId, pExam) => {
  try {
    let exam = await Exam.findByPk(pId);
    exam.set({
      id: pExam.id,
      name: pExam.name,
      date: pExam.date,
      deadline: pExam.deadline,
      ModuleId: pExam.ModuleId,
    });
    return await exam.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteExam = async (pId) => {
  try {
    await Exam.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
