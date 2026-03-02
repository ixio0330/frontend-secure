const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("계정이 등록되었습니다.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
