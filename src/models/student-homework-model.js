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
  StudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  HomeworkId: {
    type: DataTypes.INTEGER,
    references: {
      model: Homework,
      key: "id",
    },
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  check_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default StudentHomework;
