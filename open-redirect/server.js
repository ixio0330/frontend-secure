const express = require("express");
const app = express();
const PORT = 3000;
const crypto = require("crypto");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
