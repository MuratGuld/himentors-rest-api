import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./commons/sequelize.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { router as studentRouter } from "./routes/student-router.js";
import { router as mentorRouter } from "./routes/mentor-router.js";
import { router as groupRouter } from "./routes/group-router.js";
import { router as moduleRouter } from "./routes/module-router.js";
import { router as examRouter } from "./routes/exam-router.js";
import { router as homeworkRouter } from "./routes/homework-router.js";
import { router as lessonRouter } from "./routes/lesson-router.js";
import { router as mentorGroupRouter } from "./routes/mentor-group-router.js";
import { router as studentExamRouter } from "./routes/student-exam-router.js";
import { router as studentLessonRouter } from "./routes/student-lesson-router.js";
import { router as studentHomeworkRouter } from "./routes/student-homework-router.js";
import { router as studentGroupRouter } from "./routes/student-group-router.js";

app.use("/students", studentRouter);
app.use("/mentors", mentorRouter);
app.use("/groups", groupRouter);
app.use("/modules", moduleRouter);
app.use("/exams", examRouter);
app.use("/homeworks", homeworkRouter);
app.use("/lessons", lessonRouter);
app.use("/mentor-groups", mentorGroupRouter);
app.use("/student-exams", studentExamRouter);
app.use("/student-lessons", studentLessonRouter);
app.use("/student-homeworks", studentHomeworkRouter);
app.use("/student-groups", studentGroupRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
