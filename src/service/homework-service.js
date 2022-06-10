import * as homeworkRepository from "../data/homework-repository.js";
import * as studentHomeworkRepository from "../data/student-homework-repository.js";

// HOMEWORKS
// *********

// get (all homeworks)
export const getHomeworks = async () => {
  return await homeworkRepository.getHomeworks();
};

// get (a homework)
export const getHomework = async (pId) => {
  return await homeworkRepository.getHomework(pId);
};

// post
export const addHomework = async (pHomework) => {
  return await homeworkRepository.createHomework(pHomework);
};

// put
export const updateHomework = async (pId, pHomework) => {
  return await homeworkRepository.updateHomework(pId, pHomework);
};

// delete
export const deleteHomework = async (pId) => {
  return await homeworkRepository.deleteHomework(pId);
};

// STUDENT HOMEWORKS
// *****************

// get (all student homeworks)
export const getStudentHomeworks = async () => {
  return await studentHomeworkRepository.getStudentHomeworks();
};

// get (a student homework)
export const getStudentHomework = async (pId) => {
  return await studentHomeworkRepository.getStudentHomework(pId);
};

// post
export const addStudentHomework = async (pStudentHomework) => {
  return await studentHomeworkRepository.createStudentHomework(
    pStudentHomework
  );
};

// put
export const updateStudentHomework = async (pId, pStudentHomework) => {
  return await studentHomeworkRepository.updateStudentHomework(
    pId,
    pStudentHomework
  );
};

// delete
export const deleteStudentHomework = async (pId) => {
  return await studentHomeworkRepository.deleteStudentHomework(pId);
};
