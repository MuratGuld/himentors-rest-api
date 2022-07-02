import Homework from "../models/homework-model.js";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

// GET all Homeworks With Grade
export const getHomeworksWithGrade = async () => {
  try {
    const [homeworkList, metadata] = await sequelize.query(`
    SELECT h.id, h.StudentId, s.name, h.status, s.deadline, h.grade
    FROM himentorsdb.studenthomework as h
    join himentorsdb.homework as s 
    on h.HomeworkId = s.id 
    where date_add(date(s.deadline), INTERVAL 2 HOUR) > date(now()) 
    order by s.deadline`);

    return await homeworkList;
  } catch (error) {
    console.log(error);
  }
};
// GET all Homeworks With Grade Of Week
export const getHomeworksWithGradeOfWeek = async () => {
  try {
    const [homeworkList, metadata] = await sequelize.query(`
    SELECT h.id, h.StudentId, s.name, h.status, s.deadline, h.grade
    FROM himentorsdb.studenthomework as h
    join himentorsdb.homework as s 
    on h.HomeworkId = s.id 
    where date_add(date(s.deadline), INTERVAL 2 HOUR) between date(now()) and (DATE_ADD(now(),interval 7 day))
    order by s.deadline`);

    return await homeworkList;
  } catch (error) {
    console.log(error);
  }
};

// CHECK
export async function isHomeworkExisting(pId) {
  const emailCount = await Homework.count({
    where: { id: pId },
  });

  if (emailCount == 0) {
    return false;
  } else {
    return true;
  }
}

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

// PUT by Id
export const updateHomework = async (pId, pHomework) => {
  try {
    let homework = await Homework.findByPk(pId);
    homework.set({
      id: pHomework.id,
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
