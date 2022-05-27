import Student from "../models/student-model.js";

// GET all students
export const getStudents = async () => {
  try {
    return await Student.findAll();
  } catch (error) {
    console.log(error);
  }
};

// GET a movie
export const getStudent = async (pId) => {
  try {
    return await Student.findByPk(pId);
  } catch (error) {
    console.log(error);
  }
};

// POST
export const createStudent = async (pStudent) => {
  try {
    return await Student.create(pStudent);
  } catch (error) {
    console.log(error);
  }
};

// PUT
export const updateStudent = async (pId, pStudent) => {
  try {
    // return await Student.update(pStudent, {
    //   where: { id: pId },
    // });
    let student = await Student.findByPk(pId);
    student.set({
      first_name: pStudent.first_name,
      last_name: pStudent.last_name,
      gender: pStudent.gender,
    });
    return await student.save();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteStudent = async (pId) => {
  try {
    await Student.destroy({
      where: { id: pId },
    });
  } catch (error) {
    console.log(error);
  }
};
