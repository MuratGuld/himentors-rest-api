import express from "express";
const router = express.Router();
import * as lessonService from "../service/lesson-service.js";

// GET all Student Lessons
router.get("/", async (req, res) => {
  const studentLessons = await lessonService.getStudentLessons();
  res.status(200).send(studentLessons);
});

// GET a Student Lesson
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const studentLesson = await lessonService.getStudentLesson(id);

  res.status(200).send(studentLesson);
});

// ADD a Student Lesson
router.post("/", async (req, res) => {
  const studentLesson = req.body;
  const newStudentLesson = await lessonService.addStudentLesson(studentLesson);

  res.status(201).send(newStudentLesson);
});

// UPDATE a Student Lesson
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const studentLesson = req.body;
  const updatedStudentLesson = await lessonService.updateStudentLesson(
    id,
    studentLesson
  );

  res.status(200).send(updatedStudentLesson);
});

// DELETE a Student Lesson
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await lessonService.deleteStudentLesson(id);

  res.status(200).send("Deleted!");
});

export { router };
