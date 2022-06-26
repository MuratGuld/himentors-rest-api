import MentorGroup from "../models/mentor-group-model.js";

// GET all mentor groups
export const getMentorGroups = async () => {
  try {
    return await MentorGroup.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a mentor group
export const getMentorGroup = async (pId) => {
  try {
    return await MentorGroup.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createMentorGroup = async (pMentorGroup) => {
  try {
    return await MentorGroup.create(pMentorGroup);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateMentorGroup = async (pId, pMentorGroup) => {
  try {
    let mentorGroup = await MentorGroup.findByPk(pId);
    mentorGroup.set({
      MentorId: pMentorGroup.MentorId,
      GroupId: pMentorGroup.GroupId,
    });
    return await mentorGroup.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteMentorGroup = async (pId) => {
  try {
    await MentorGroup.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
