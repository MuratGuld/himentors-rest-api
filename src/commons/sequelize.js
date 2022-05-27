import { Sequelize } from "sequelize";
import Student from "../models/student-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await Student.sync();
    console.log("Connected to the Database!");
  } catch (error) {
    console.log("Error");
  }
};

connectToDatabase();
