// load MONGO_URI from the .env file
require("dotenv").config();
const { MongoClient } = require("mongodb");

// create the MongoDB client with the connection string from .env
const client = new MongoClient(process.env.MONGO_URI);

// connect to MongoDB Atlas once when the server starts
async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}
connectDatabase();



const express = require("express");
const cors = require("cors");

const app = express();

// the pa2 database and the users collection inside it
const db = client.db("pa2");
const users = db.collection("users");

// read JSON bodies out of incoming requests
app.use(express.json());
// let the React dev server call this API from a different port
app.use(cors());

// simple route to check that the server is alive
app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});


// Signup: create a new user in MongoDB
app.post("/signup", async (req, res) => {
  // take the four fields out of the request body
  const { f_name, l_name, username, password } = req.body;

  // store the new user as one document in the users collection
  await users.insertOne({
    f_name,
    l_name,
    username,
    password,
  });

  // 201 means a new resource was created
  res.status(201).json({
    message: "User created successfully",
  });
});


// Login: check the username and password against MongoDB
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // look the user up by username only, then compare the password below
  const user = await users.findOne({
    username,
  });
  
  if (!user) {
    // no account with this username
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }else if (user.password !== password) {
    // the account exists but the password does not match
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }else{
    // username and password are both correct
    res.status(200).json({
      message: "Login successful",
    });
  }
});

// start listening for requests
app.listen(9000, () => {
    console.log("Server running on port 9000");
});