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
  StudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  ExamId: {
    type: DataTypes.INTEGER,
    references: {
      model: Exam,
      key: "id",
    },
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default StudentExam;
