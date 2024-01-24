const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  try {
    console.log("Listening on port " + process.env.PORT);
  } catch (error) {
    console.log("Not Connected");
  }
});
