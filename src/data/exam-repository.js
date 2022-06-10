import Exam from "../models/exam-model.js";

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

// PUT
export const updateExam = async (pId, pExam) => {
  try {
    // return await Exam.update(pGExam, {
    //   where: { id: pId },
    // });
    let exam = await Exam.findByPk(pId);
    exam.set({
      name: pExam.name,
      date: pExam.date,
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
