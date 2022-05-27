import express from "express";
const router = express.Router();
import * as studentService from "../service/student-service.js";

// GET all students
router.get("/", async (req, res) => {
  const students = await studentService.getStudents();
  res.status(200).send(students);
});

// GET a student
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const student = await studentService.getStudent(id);

  res.status(200).send(student);
});

// ADD a student
router.post("/", async (req, res) => {
  const student = req.body;
  const newStudent = await studentService.addStudent(student);

  res.status(201).send(newStudent);
});

// UPDATE a student
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const updatedStudent = await studentService.updateStudent(id, student);

  res.status(200).send("DENEME");
});

// DELETE a student
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await studentService.deleteStudent(id);

  res.status(200).send("Deleted!");
});

export { router };
