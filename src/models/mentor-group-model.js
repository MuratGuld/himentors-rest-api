import { Sequelize, DataTypes } from "sequelize";
import Group from "./group-model.js";
import Mentor from "./mentor-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const MentorGroup = sequelize.define("MentorGroup", {
  MentorId: {
    type: DataTypes.STRING,
    references: {
      model: Mentor,
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

export default MentorGroup;
