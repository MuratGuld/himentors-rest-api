import express from "express";
const router = express.Router();
import * as lessonService from "../service/lesson-service.js";

// GET all lessons
router.get("/", async (req, res) => {
  const lessons = await lessonService.getLessons();
  res.status(200).send(lessons);
});

// GET a lesson
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const lesson = await lessonService.getLesson(id);

  res.status(200).send(lesson);
});

// ADD a lesson
router.post("/", async (req, res) => {
  const lesson = req.body;
  const newLesson = await lessonService.addLesson(lesson);

  res.status(201).send(newLesson);
});

// UPDATE a lesson
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const lesson = req.body;
  const updatedLesson = await lessonService.updateLesson(id, lesson);

  res.status(200).send(updatedLesson);
});

// DELETE a lesson
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await lessonService.deleteLesson(id);

  res.status(200).send("Deleted!");
});

export { router };
