import * as lessonRepository from "../data/lesson-repository.js";
import * as studentLessonRepository from "../data/student-lesson-repository.js";

// LESSON
// ******
// get (all lessons)
export const getLessons = async () => {
  return await lessonRepository.getLessons();
};

// get (a lesson)
export const getLesson = async (pId) => {
  return await lessonRepository.getLesson(pId);
};

// post
export const addLesson = async (pLesson) => {
  return await lessonRepository.createLesson(pLesson);
};

// put
export const updateLesson = async (pId, pLesson) => {
  return await lessonRepository.updateLesson(pId, pLesson);
};

// delete
export const deleteLesson = async (pId) => {
  return await studentLessonRepository.deleteStudentLesson(pId);
};

// STUDENT LESSON
// **************
// get (all student lessons)
export const getStudentLessons = async () => {
  return await studentLessonRepository.getStudentLessons();
};

// get (a student lesson)
export const getStudentLesson = async (pId) => {
  return await studentLessonRepository.getStudentLesson(pId);
};

// post
export const addStudentLesson = async (pStudentLesson) => {
  return await studentLessonRepository.createStudentLesson(pStudentLesson);
};

// put
export const updateStudentLesson = async (pId, pStudentLesson) => {
  return await studentLessonRepository.updateStudentLesson(pId, pStudentLesson);
};

// delete
export const deleteStudentLesson = async (pId) => {
  return await studentLessonRepository.deleteStudentLesson(pId);
};
