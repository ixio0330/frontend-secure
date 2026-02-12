const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

const crypto = require("crypto");

router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000 * 5,
    },
  }),
);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

let sessionData = {};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "test" || password !== "1234") {
    res.status(403);
    res.send("로그인 실패");
    return;
  }

  sessionData = req.session;
  sessionData.username = username;

  const token = crypto.randomUUID();
  res.cookie("csrf_token", token, {
    secure: true,
  });

  res.redirect("/send.html");
});

router.post("/send", (req, res) => {
  if (
    req.session.username !== "test" ||
    req.session.username !== sessionData.username
  ) {
    res.status(403);
    res.send("로그인이 필요합니다");
    return;
  }

  if (req.cookies["csrf_token"] !== req.body["csrf_token"]) {
    res.status(400);
    res.send("잘못된 요청입니다.");
    return;
  }

  const { to, amount } = req.body;
  res.send(`${to}에게 ${amount}원을 송금하였습니다.`);
});

module.exports = router;
