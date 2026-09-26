require("dotenv").config();                          // ← 放在檔案第一行
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

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

const db = client.db("pa2");
const users = db.collection("users");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});


app.post("/signup", async (req, res) => {
  const { f_name, l_name, username, password } = req.body;

  await users.insertOne({
    f_name,
    l_name,
    username,
    password,
  });

  res.status(201).json({
    message: "User created successfully",
  });
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({
    username,
  });
  
  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }else if (user.password !== password) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }else{
    res.status(200).json({
      message: "Login successful",
    });
  }
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});