import express from "express";
const router = express.Router();
import * as groupService from "../service/group-service.js";

// GET active groups
router.get("/active-groups", async (req, res) => {
  const activeGroups = await groupService.getActiveGroups();
  res.status(200).send(activeGroups);
});

router.get("/", async (req, res) => {
  const groups = await groupService.getGroups();
  res.status(200).send(groups);
});

// GET a group
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const group = await groupService.getGroup(id);

  res.status(200).send(group);
});

// ADD a group
router.post("/", async (req, res) => {
  const group = req.body;
  const newGroup = await groupService.addGroup(group);

  res.status(201).send(newGroup);
});

// UPDATE a group
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const group = req.body;
  const updatedGroup = await groupService.updateGroup(id, group);

  res.status(200).send(updatedGroup);
});

// DELETE a group
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await groupService.deleteGroup(id);

  res.status(200).send("Deleted!");
});

export { router };
