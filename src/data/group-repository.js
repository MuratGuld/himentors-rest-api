import Group from "../models/group-model.js";
import Module from "../models/module-model.js";

// GET active groups
export const getActiveGroups = async () => {
  try {
    const activeModule = await Module.findOne({ where: { status: "ACTIVE" } });
    return await Group.findAll({
      where: { ModuleId: activeModule.id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async () => {
  try {
    return await Group.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a group
export const getGroup = async (pId) => {
  try {
    return await Group.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createGroup = async (pGroup) => {
  try {
    return await Group.create(pGroup);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateGroup = async (pId, pGroup) => {
  try {
    let group = await Group.findByPk(pId);
    group.set({
      name: pGroup.name,
      ModuleId: pGroup.ModuleId,
    });
    return await group.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteGroup = async (pId) => {
  try {
    await Group.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
