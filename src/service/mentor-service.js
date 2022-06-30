import * as mentorRepository from "../data/mentor-repository.js";

// Check User
export const checkUser = async (pUser) => {
  return await mentorRepository.isUserExisting(pUser.email);
};

// get Mentors without group
export const getMentorsWithoutGroup = async () => {
  return await mentorRepository.getMentorsWithoutGroup();
};

// get (all mentors)
export const getMentors = async () => {
  return await mentorRepository.getMentors();
};

// get (a mentor)
export const getMentor = async (pId) => {
  return await mentorRepository.getMentor(pId);
};

// post
export const addMentor = async (pMentor) => {
  return await mentorRepository.createMentor(pMentor);
};

// put
export const updateMentor = async (pId, pMentor) => {
  return await mentorRepository.updateMentor(pId, pMentor);
};

// delete
export const deleteMentor = async (pId) => {
  return await mentorRepository.deleteMentor(pId);
};
