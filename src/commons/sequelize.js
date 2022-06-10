import { Sequelize } from "sequelize";
import Module from "../models/module-model.js";
import Mentor from "../models/mentor-model.js";
import Group from "../models/group-model.js";
import Student from "../models/student-model.js";
import StudentGroup from "../models/student-group-model.js";
import Homework from "../models/homework-model.js";
import Lesson from "../models/lesson-model.js";
import Exam from "../models/exam-model.js";
import StudentExam from "../models/student-exam-model.js";
import StudentHomework from "../models/student-homework-model.js";
import StudentLesson from "../models/student-lesson-model.js";

const sequelize = new Sequelize("himentorsdb", "root", "db1234", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {},
  define: {
    freezeTableName: true,
  },
});

// associations
Mentor.hasMany(Group);
Group.belongsTo(Mentor);
Module.hasMany(Group);
Group.belongsTo(Module);
Module.hasMany(Exam);
Exam.belongsTo(Module);
Module.hasMany(Homework);
Homework.belongsTo(Module);
Module.hasMany(Lesson);
Lesson.belongsTo(Module);
Student.belongsToMany(Group, { through: "StudentGroup" });
Group.belongsToMany(Student, { through: "StudentGroup" });
Student.belongsToMany(Lesson, { through: "StudentLesson" });
Lesson.belongsToMany(Student, { through: "StudentLesson" });
Student.belongsToMany(Homework, { through: "StudentHomework" });
Homework.belongsToMany(Student, { through: "StudentHomework" });
Student.belongsToMany(Exam, { through: "StudentExam" });
Exam.belongsToMany(Student, { through: "StudentExam" });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await Module.sync();
    await Mentor.sync();
    await Group.sync();
    await Student.sync();
    await Homework.sync();
    await Lesson.sync();
    await Exam.sync();
    await StudentExam.sync();
    await StudentHomework.sync();
    await StudentLesson.sync();
    await StudentGroup.sync();
    console.log("Connected to the Database!");
  } catch (error) {
    console.log("Error");
  }
};

connectToDatabase();
