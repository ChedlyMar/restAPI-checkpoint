import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("user", userSchema);

export default User;
