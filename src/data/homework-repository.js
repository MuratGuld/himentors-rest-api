import Homework from "../models/homework-model.js";

// CHECK
export async function isHomeworkExisting(pId) {
  const emailCount = await Homework.count({
    where: { id: pId },
  });

  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
}

// GET all Homeworks
export const getHomeworks = async () => {
  try {
    return await Homework.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a Homework
export const getHomework = async (pId) => {
  try {
    return await Homework.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createHomework = async (pHomework) => {
  try {
    return await Homework.create(pHomework);
  } catch (error) {
    console.log(error);
  }
};

// PUT by Id
export const updateHomework = async (pId, pHomework) => {
  try {
    let homework = await Homework.findByPk(pId);
    homework.set({
      id: pHomework.id,
      name: pHomework.name,
      assignment_date: pHomework.assignment_date,
      deadline: pHomework.deadline,
      ModuleId: pHomework.ModuleId,
    });
    return await homework.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteHomework = async (pId) => {
  try {
    await Homework.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
