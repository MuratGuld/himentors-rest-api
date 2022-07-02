import StudentGroup from "../models/student-group-model.js";

// GET all student groups
export const getStudentGroups = async () => {
  try {
    return await StudentGroup.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a student group
export const getStudentGroup = async (pId) => {
  try {
    return await StudentGroup.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudentGroup = async (pStudentGroup) => {
  try {
    return await StudentGroup.create(pStudentGroup);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudentGroup = async (pId, pStudentGroup) => {
  try {
    let studentGroup = await StudentGroup.findByPk(pId);
    studentGroup.set({
      StudentId: pStudentGroup.StudentId,
      GroupId: pStudentGroup.GroupId,
    });
    return await studentGroup.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudentGroup = async (pId) => {
  try {
    await StudentGroup.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE by GroupId
export const deleteStudentGroupByGroupId = async (pGroupId) => {
  try {
    await StudentGroup.destroy({
      where: { GroupId: pGroupId },
    });
  } catch (error) {
    console.log(error);
  }
};
