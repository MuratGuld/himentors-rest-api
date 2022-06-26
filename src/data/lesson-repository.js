import Lesson from "../models/lesson-model.js";

// GET all Lessons
export const getLessons = async () => {
  try {
    return await Lesson.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a Lesson
export const getLesson = async (pId) => {
  try {
    return await Lesson.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createLesson = async (pLesson) => {
  try {
    return await Lesson.create(pLesson);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateLesson = async (pId, pLesson) => {
  try {
    let lesson = await Lesson.findByPk(pId);
    lesson.set({
      name: pLesson.name,
      date: pLesson.date,
      ModuleId: pLesson.ModuleId,
    });
    return await lesson.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteLesson = async (pId) => {
  try {
    await Lesson.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
