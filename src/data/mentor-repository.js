import Mentor from "../models/mentor-model.js";

// CHECK
export async function isUserExisting(pEmail) {
  const emailCount = await Mentor.count({
    where: { email: pEmail },
  });

  const permittedMentor = await Mentor.findOne({ where: { email: pEmail } });

  if (emailCount == 0) {
    return {
      permitted: false,
    };
  } else {
    return {
      permitted: true,
      role: permittedMentor.role,
    };
  }
}

// GET all mentors
export const getMentors = async () => {
  try {
    return await Mentor.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a movie
export const getMentor = async (pId) => {
  try {
    return await Mentor.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createMentor = async (pMentor) => {
  try {
    return await Mentor.create(pMentor);
  } catch (error) {
    console.log(error);
  }
};

// PUT by Id
export const updateMentor = async (pId, pMentor) => {
  try {
    let mentor = await Mentor.findByPk(pId);
    mentor.set({
      id: pMentor.id,
      first_name: pMentor.first_name,
      last_name: pMentor.last_name,
      email: pMentor.email,
    });
    return await mentor.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteMentor = async (pId) => {
  try {
    await Mentor.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
