import jwt from "jsonwebtoken";
import Jailer from "../models/jailer.model.js"; // adjust import
import bcrypt from "bcryptjs";

const jailerSignUp = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    // check if jailer already exists
    const existing = await Jailer.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Jailer already exists" });
    }

    // save plain password (⚠️ insecure for production)
    const jailer = new Jailer({ name, password });
    await jailer.save();

    // create token
    const token = jwt.sign(
      { id: jailer._id, name: jailer.name },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Signup successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error occurred in jailer.controller.js in jailerSignUp");
  }
};

const jailerLogin = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }

        const jailer = await Jailer.findOne({ name });
        if (!jailer) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare plain password from req with hashed password in DB
        const isMatch = await bcrypt.compare(password, jailer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: jailer._id, name: jailer.name },
            "your_jwt_secret", // Use an environment variable for this!
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error occurred in jailer.controller.js in jailerLogin");
    }
};

export { jailerSignUp, jailerLogin };


//  "type": "module",
//   "author": "",
//   "license": "ISC",
//   "description": "",
//   "dependencies": {
//     "bcryptjs": "^3.0.2",
//     "cookie-parser": "^1.4.7",
//     "cors": "^2.8.5",
//     "dotenv": "^17.2.1",
//     "express": "^5.1.0",
//     "jsonwebtoken": "^9.0.2",
//     "mongoose": "^8.18.0",
//     "nodemailer": "^7.0.5",
//     "nodemon": "^3.1.10"