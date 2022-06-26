import { Sequelize, DataTypes } from "sequelize";
import Exam from "./exam-model.js";
import Student from "./student-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const StudentExam = sequelize.define("StudentExam", {
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
  ExamId: {
    type: DataTypes.STRING,
    references: {
      model: Exam,
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

export default StudentExam;
