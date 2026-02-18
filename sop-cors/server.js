const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api", (req, res) => {
  if (req.headers["X-Token"]) {
    return res.send({
      type: "basic",
      redirected: false,
    });
  }

  res.status(404);
  res.send("Bad Request");
});

// 동일 출처 허용하는지 테스트 하려면, 브라우저에 아래 코드를 입력한다.
// await fetch('http://localhost:3000/api', {
//   headers: {
//     "X-Token": "abcdefg"
//   }
// })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
