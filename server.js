import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/user.js";

const app = express();
app.use(express.json());
// get connection data from .env file
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

// Routes
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.post("/", async (req, res) => {
  const user = req.body;
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndRemove(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// connect to DB & lunch server
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`app works on port ${PORT}`)))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
