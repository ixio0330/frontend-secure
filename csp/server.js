const express = require("express");
const app = express();
const PORT = 3000;
const crypto = require("crypto");

app.use(express.static("."));

app.set("view engine", "ejs");

app.get("/csp", (req, res) => {
  // 인라인 스크립트 안전하게 실행
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic';` + // 동적 스크립트 생성해서 실행
      "object-src 'none';" +
      "base-uri 'none';",
  );
  res.render("csp", { nonce: nonceValue });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
