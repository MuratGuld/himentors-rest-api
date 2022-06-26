import express from "express";
const router = express.Router();
import * as groupService from "../service/group-service.js";

// GET all mentor groups
router.get("/", async (req, res) => {
  const mentorGroups = await groupService.getMentorGroups();
  res.status(200).send(mentorGroups);
});

// GET a mentor group
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const mentorGroup = await groupService.getMentorGroup(id);

  res.status(200).send(mentorGroup);
});

// ADD a mentor group
router.post("/", async (req, res) => {
  const mentorGroup = req.body;
  const newMentorGroup = await groupService.addMentorGroup(mentorGroup);

  res.status(201).send(newMentorGroup);
});

// UPDATE a mentor group
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const mentorGroup = req.body;
  const updatedMentorGroup = await groupService.updateMentorGroup(
    id,
    mentorGroup
  );

  res.status(200).send(updatedMentorGroup);
});

// DELETE a mentor group
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await groupService.deleteMentorGroup(id);

  res.status(200).send("Deleted!");
});

export { router };
