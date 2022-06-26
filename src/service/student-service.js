import * as studentRepository from "../data/student-repository.js";

// get Grades of Student
export const getGradesOfStudent = async (pStudentId) => {
  return await studentRepository.getGradesOfStudent(pStudentId);
};
// get Students of Mentor
export const getStudentsOfMentor = async (pUser) => {
  return await studentRepository.getStudentsOfMentor(pUser);
};

// get Students by Group Id
export const getStudentsByGroupId = async (pGroupId) => {
  return await studentRepository.getStudentsByGroupId(pGroupId);
};

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
