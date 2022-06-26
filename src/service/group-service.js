import * as groupRepository from "../data/group-repository.js";
import * as studentGroupRepository from "../data/student-group-repository.js";
import * as mentorGroupRepository from "../data/mentor-group-repository.js";

// GROUP 
// *****
// get (active groups)
export const getActiveGroups = async () => {
  return await groupRepository.getActiveGroups();
};

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


// MENTOR GROUP
// *************
// get (all groups)
export const getMentorGroups = async () => {
  return await mentorGroupRepository.getMentorGroups();
};

// get (a group)
export const getMentorGroup = async (pId) => {
  return await mentorGroupRepository.getMentorGroup(pId);
};

// post
export const addMentorGroup = async (pGroup) => {
  return await mentorGroupRepository.createMentorGroup(pGroup);
};

// put
export const updateMentorGroup = async (pId, pMentorGroup) => {
  return await mentorGroupRepository.updateMentorGroup(pId, pMentorGroup);
};

// delete
export const deleteMentorGroup = async (pId) => {
  return await mentorGroupRepository.deleteMentorGroup(pId);
};