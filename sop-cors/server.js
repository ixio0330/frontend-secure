const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/sop", (req, res) => {
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
// await fetch('http://localhost:3000/api/sop', {
//   headers: {
//     "X-Token": "abcdefg"
//   }
// })

const allowOriginList = ["http://localhost:3001", "http://localhost:3003"];

app.use((req, res, next) => {
  // * 와일드카드 사용 방법
  // res.header("Access-Control-Allow-Origin", "*");

  // * 특정 출처만 허용하는 방법
  if (req.headers.origin && allowOriginList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }

  next();
});

app.get("/api/cors", (req, res) => {
  if (req.headers["X-Token".toLowerCase()]) {
    return res.send("Hello world!");
  }

  res.status(404);
  res.send("Bad Request");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
