import express from "express";
const router = express.Router();
import * as examService from "../service/exam-service.js";

// GET all StudentExams
router.get("/", async (req, res) => {
  const studentExams = await examService.getStudentExams();
  res.status(200).send(studentExams);
});

// GET a StudentExam
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const studentExam = await examService.getStudentExam(id);

  res.status(200).send(studentExam);
});

// ADD a StudentExam
router.post("/", async (req, res) => {
  const studentExam = req.body;
  const newStudentExam = await examService.addStudentExam(studentExam);

  res.status(201).send(newStudentExam);
});

// UPDATE a StudentExam
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const studentExam = req.body;
  const updatedStudentExam = await examService.updateStudentExam(
    id,
    studentExam
  );

  res.status(200).send(updatedStudentExam);
});

// DELETE a StudentExam
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await examService.deleteStudentExam(id);

  res.status(200).send("Deleted!");
});

export { router };
