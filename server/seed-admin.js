import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mini-crm";

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  const email = "admin@crm.com";
  const password = "admin123";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists.");
    process.exit(0);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({
    name: "Admin",
    email,
    password: hashed,
    role: "Admin",
    phone: "1234567890"
  });
  await user.save();
  console.log("Admin user created:", email, "/ Password:", password);
  process.exit(0);
}

createAdmin();
