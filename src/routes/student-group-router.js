import express from "express";
const router = express.Router();
import * as groupService from "../service/group-service.js";

// GET all student groups
router.get("/", async (req, res) => {
  const studentGroups = await groupService.getStudentGroups();
  res.status(200).send(studentGroups);
});

// GET a student group
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const studentGroup = await groupService.getStudentGroup(id);

  res.status(200).send(studentGroup);
});

// ADD a student group
router.post("/", async (req, res) => {
  const studentGroup = req.body;
  const newStudentGroup = await groupService.addStudentGroup(studentGroup);

  res.status(201).send(newStudentGroup);
});

// UPDATE a student group
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const studentGroup = req.body;
  const updatedStudentGroup = await groupService.updateStudentGroup(
    id,
    studentGroup
  );

  res.status(200).send(updatedStudentGroup);
});

// DELETE a student group
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await groupService.deleteStudentGroup(id);

  res.status(200).send("Deleted!");
});

export { router };
