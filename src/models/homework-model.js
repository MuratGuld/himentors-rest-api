import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const Homework = sequelize.define("Homework", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Homework;