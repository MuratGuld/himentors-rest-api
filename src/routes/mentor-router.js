import express from "express";
const router = express.Router();
import * as mentorService from "../service/mentor-service.js";

// CHECK if user is in db
router.post("/check", async (req, res) => {
  const auth0User = req.body;
  const user = {
    email: auth0User.email,
    first_name: auth0User.given_name,
    last_name: auth0User.family_name,
  };

  const status = await mentorService.checkUser(user); // firstname, lastname, email
  res.status(200).send(status);
});

// GET mentors without group
router.get("/mentors-without-group", async (req, res) => {
  const mentors = await mentorService.getMentorsWithoutGroup();
  res.status(200).send(mentors);
});

// GET mentors of group
router.get("/mentors-of-group", async (req, res) => {
  const groupId = req.query.groupId;
  const mentors = await mentorService.getMentorsByGroupId(groupId);
  res.status(200).send(mentors);
});

// GET all mentors
router.get("/", async (req, res) => {
  const mentors = await mentorService.getMentors();
  res.status(200).send(mentors);
});

// GET a mentor
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const mentor = await mentorService.getMentor(id);

  res.status(200).send(mentor);
});

// ADD a mentor
router.post("/", async (req, res) => {
  const mentor = req.body;
  const newMentor = await mentorService.addMentor(mentor);

  res.status(201).send(newMentor);
});

// UPDATE a mentor
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const mentor = req.body;
  const updatedMentor = await mentorService.updateMentor(id, mentor);

  res.status(200).send(updatedMentor);
});

// DELETE a mentor
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await mentorService.deleteMentor(id);

  res.status(200).send("Deleted!");
});

export { router };
