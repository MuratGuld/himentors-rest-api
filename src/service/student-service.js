import * as studentRepository from "../data/student-repository.js";

// get (all student)
export const getStudents = async () => {
  return await studentRepository.getStudents();
};

// get (a student)
export const getStudent = async (pId) => {
  return await studentRepository.getStudent(pId);
};

// post
export const addStudent = async (pStudent) => {
  return await studentRepository.createStudent(pStudent);
};

// put
export const updateStudent = async (pId, pStudent) => {
  return await studentRepository.updateStudent(pId, pStudent);
};

// delete
export const deleteStudent = async (pId) => {
  return await studentRepository.deleteStudent(pId);
};
