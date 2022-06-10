import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const Group = sequelize.define("Group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Group;
