import Homework from "../models/homework-model.js";

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

// PUT
export const updateHomework = async (pId, pHomework) => {
  try {
    // return await Homework.update(pHomework, {
    //   where: { id: pId },
    // });
    let homework = await Homework.findByPk(pId);
    homework.set({
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
