import express from "express";
const router = express.Router();
import * as studentService from "../service/student-service.js";

// get grades of student
router.get("/grades/:id", async (req, res) => {
  const studentId = req.params.id;

  const studentGrades = await studentService.getGradesOfStudent(studentId);
  res.status(200).send(studentGrades);
});

// get students of mentor
router.post("/group-members", async (req, res) => {
  const auth0User = req.body;
  const user = {
    email: auth0User.email,
    first_name: auth0User.given_name,
    last_name: auth0User.family_name,
  };

  const studentList = await studentService.getStudentsOfMentor(user);
  res.status(200).send(studentList);
});

// GET students of group
router.get("/", async (req, res) => {
  const groupId = req.query.groupId;
  const students = await studentService.getStudentsByGroupId(groupId);
  res.status(200).send(students);
});

// GET students without group
router.get("/students-without-group", async (req, res) => {
  const students = await studentService.getStudentsWithoutGroup();
  res.status(200).send(students);
});

// GET all students
router.get("/", async (req, res) => {
  const students = await studentService.getStudents();
  res.status(200).send(students);
});

// GET a student
router.get("/:id", async (req, res) => {
  const id = req.params.id;
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

  res.status(200).send(updatedStudent);
});

// DELETE a student
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await studentService.deleteStudent(id);

  res.status(200).send("Deleted!");
});

export { router };
