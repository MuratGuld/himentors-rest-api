import express from "express";
const router = express.Router();
import * as homeworkService from "../service/homework-service.js";

// GET all homeworks
router.get("/", async (req, res) => {
  const homeworks = await homeworkService.getHomeworks();
  res.status(200).send(homeworks);
});

// GET a homework
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const homework = await homeworkService.getHomework(id);

  res.status(200).send(homework);
});

// ADD a homework
router.post("/", async (req, res) => {
  const homework = req.body;
  const newHomework = await homeworkService.addHomework(homework);

  res.status(201).send(newHomework);
});

// UPDATE a homework
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const homework = req.body;
  const updatedHomework = await homeworkService.updateHomework(id, homework);

  res.status(200).send(updatedHomework);
});

// DELETE a homework
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await homeworkService.deleteHomework(id);

  res.status(200).send("Deleted!");
});

export { router };
