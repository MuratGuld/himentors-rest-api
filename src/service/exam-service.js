import * as examRepository from "../data/exam-repository.js";
import * as studentExamRepository from "../data/student-exam-repository.js";

// EXAM
// ****

// get (all exams)
export const getExams = async () => {
  return await examRepository.getExams();
};

// get (a exam)
export const getExam = async (pId) => {
  return await examRepository.getExam(pId);
};

// post
export const addExam = async (pExam) => {
  return await examRepository.createExam(pExam);
};

// put
export const updateExam = async (pId, pExam) => {
  return await examRepository.updateExam(pId, pExam);
};

// delete
export const deleteExam = async (pId) => {
  return await examRepository.deleteExam(pId);
};

// STUDENT EXAM
// ****

// get (all student exams)
export const getStudentExams = async () => {
  return await studentExamRepository.getStudentExams();
};

// get (a student exam)
export const getStudentExam = async (pId) => {
  return await studentExamRepository.getStudentExam(pId);
};

// post
export const addStudentExam = async (pStudentExam) => {
  return await studentExamRepository.createStudentExam(pStudentExam);
};

// put
export const updateStudentExam = async (pId, pStudentExam) => {
  return await studentExamRepository.updateStudentExam(pId, pStudentExam);
};

// delete
export const deleteStudentExam = async (pId) => {
  return await studentExamRepository.deleteStudentExam(pId);
};
