import { Sequelize, DataTypes } from "sequelize";
import Group from "./group-model.js";
import Student from "./student-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const StudentGroup = sequelize.define("StudentGroup", {
  StudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: "id",
    },
  },
});

export default StudentGroup;
