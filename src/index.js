import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./commons/sequelize.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { router as studentRouter } from "./routes/student-router.js";

app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
