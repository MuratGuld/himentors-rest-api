import express from "express";
const router = express.Router();

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
router.post("/", async (req,res) => {
    const student = req.body;
    const newStudent = studentService.addStudent(student);

    res.status(201).send(newStudent);
})

router.put("/:id", (req,res) => {
    
})