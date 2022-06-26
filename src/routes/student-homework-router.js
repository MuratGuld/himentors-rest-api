import express from "express";
const router = express.Router();
import * as homeworkService from "../service/homework-service.js";

// GET all Student Homeworks
router.get("/", async (req, res) => {
  const studentHomeworks = await homeworkService.getStudentHomeworks();
  res.status(200).send(studentHomeworks);
});

// GET a Student Homework
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const studentHomework = await homeworkService.getStudentHomework(id);

  res.status(200).send(studentHomework);
});

// ADD a Student Homework
router.post("/", async (req, res) => {
  const studentHomework = req.body;
  const newStudentHomework = await homeworkService.addStudentHomework(
    studentHomework
  );

  res.status(201).send(newStudentHomework);
});

// UPDATE a Student Homework
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const studentHomework = req.body;
  const updatedStudentHomework = await homeworkService.updateStudentHomework(
    id,
    studentHomework
  );

  res.status(200).send(updatedStudentHomework);
});

// DELETE a Student Homework
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await homeworkService.deleteStudentHomework(id);

  res.status(200).send("Deleted!");
});

export { router };
