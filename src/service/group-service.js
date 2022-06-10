import * as groupRepository from "../data/group-repository.js";
import * as studentGroupRepository from "../data/student-group-repository.js";

// GROUP
// *****
// get (all groups)
export const getGroups = async () => {
  return await groupRepository.getGroups();
};

// get (a group)
export const getGroup = async (pId) => {
  return await groupRepository.getGroup(pId);
};

// post
export const addGroup = async (pGroup) => {
  return await groupRepository.createGroup(pGroup);
};

// put
export const updateGroup = async (pId, pGroup) => {
  return await groupRepository.updateGroup(pId, pGroup);
};

// delete
export const deleteGroup = async (pId) => {
  return await groupRepository.deleteGroup(pId);
};

// STUDENT GROUP
// *************
// get (all groups)
export const getStudentGroups = async () => {
  return await studentGroupRepository.getStudentGroups();
};

// get (a group)
export const getStudentGroup = async (pId) => {
  return await studentGroupRepository.getStudentGroup(pId);
};

// post
export const addStudentGroup = async (pGroup) => {
  return await studentGroupRepository.createStudentGroup(pGroup);
};

// put
export const updateStudentGroup = async (pId, pStudentGroup) => {
  return await studentGroupRepository.updateStudentGroup(pId, pStudentGroup);
};

// delete
export const deleteStudentGroup = async (pId) => {
  return await studentGroupRepository.deleteStudentGroup(pId);
};
