const express = require("express");
const app = express();
const PORT = 3000;
const crypto = require("crypto");

app.use(express.static("."));

app.set("view engine", "ejs");

app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header("Content-Security-Policy", `script-src 'nonce-${nonceValue}'`);
  res.render("csp", { nonce: nonceValue });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
