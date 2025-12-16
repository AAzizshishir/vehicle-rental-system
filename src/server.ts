import express from "express";
import config from "./config";
import initDB from "./config/db";

const app = express();
const port = config.port;

// Initialized Database
initDB();

app.get("/", (req, res) => {
  res.send("Vehicle Rental System!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
