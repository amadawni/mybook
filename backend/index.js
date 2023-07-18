// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: ".env" });;

// Create an instance of Express
const app = express();
app.use(cors());
// Set up the MongoDB connection
 mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo successfully"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a user model
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to handle incoming requests
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user object
    const user = new User({ username, password });

    // Save the user to the database
    await user.save();
    console.log("Login Saved");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
