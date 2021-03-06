import Module from "../models/module-model.js";

// GET all modules
export const getModules = async () => {
  try {
    return await Module.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a Module
export const getModule = async (pId) => {
  try {
    return await Module.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// GET a Module if ACTIVE
export const getActiveModule = async () => {
  try {
    return await Module.findOne({ where: { status: "ACTIVE" } });
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createModule = async (pModule) => {
  try {
    return await Module.create(pModule);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateModule = async (pId, pModule) => {
  try {
    let module = await Module.findByPk(pId);
    module.set({
      id: pModule.id,
      name: pModule.name,
      start_date: pModule.start_date,
      end_date: pModule.end_date,
      status: pModule.status,
    });
    return await module.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteModule = async (pId) => {
  try {
    await Module.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
