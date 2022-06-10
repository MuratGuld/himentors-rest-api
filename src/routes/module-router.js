import express from "express";
const router = express.Router();
import * as moduleService from "../service/module-service.js";

// GET all modules
router.get("/", async (req, res) => {
  const modules = await moduleService.getModules();
  res.status(200).send(modules);
});

// GET a module
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const module = await moduleService.getModule(id);

  res.status(200).send(module);
});

// ADD a module
router.post("/", async (req, res) => {
  const module = req.body;
  const newModule = await moduleService.addModule(module);

  res.status(201).send(newModule);
});

// UPDATE a module
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const module = req.body;
  const updatedModule = await moduleService.updateModule(id, module);

  res.status(200).send(updatedModule);
});

// DELETE a module
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await moduleService.deleteModule(id);

  res.status(200).send("Deleted!");
});

export { router };
