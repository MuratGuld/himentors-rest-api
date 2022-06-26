import { Sequelize, DataTypes } from "sequelize";
import Student from "./student-model.js";
import Homework from "./homework-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const StudentHomework = sequelize.define("StudentHomework", {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  StudentId: {
    type: DataTypes.STRING,
    references: {
      model: Student,
      key: "id",
    },
  },
  HomeworkId: {
    type: DataTypes.STRING,
    references: {
      model: Homework,
      key: "id",
    },
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default StudentHomework;
