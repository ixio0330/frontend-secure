const express = require("express");
const app = express();
const PORT = 3000;
const csrf = require("./routes/csrf");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(csrf);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
