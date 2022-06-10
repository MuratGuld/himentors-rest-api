import { Sequelize, DataTypes } from "sequelize";
import Lesson from "./lesson-model.js";
import Student from "./student-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const StudentLesson = sequelize.define("StudentLesson", {
  StudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  LessonId: {
    type: DataTypes.INTEGER,
    references: {
      model: Lesson,
      key: "id",
    },
  },
  participate_status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

export default StudentLesson;
