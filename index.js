const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const TodoModel = require("./Models/Todo.js");

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;
const port = process.env.PORT;
mongoose
  .connect(dbURI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: ", err));

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { task, done } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { task, done }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
