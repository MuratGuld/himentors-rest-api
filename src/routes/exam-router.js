import express from "express";
const router = express.Router();
import * as examService from "../service/exam-service.js";

// GET all exams
router.get("/", async (req, res) => {
  const exams = await examService.getExams();
  res.status(200).send(exams);
});

// GET a exam
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const exam = await examService.getExam(id);

  res.status(200).send(exam);
});

// ADD a exam
router.post("/", async (req, res) => {
  const exam = req.body;
  const newExam = await examService.addExam(exam);

  res.status(201).send(newExam);
});

// UPDATE a exam
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const exam = req.body;
  const updatedExam = await examService.updateExam(id, exam);

  res.status(200).send(updatedExam);
});

// DELETE a exam
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await examService.deleteExam(id);

  res.status(200).send("Deleted!");
});

export { router };
