const express = require("express");
const app = express();
const PORT = 3001;

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      res.header("X-Frame-Options", "SAMEORIGIN");
    },
  }),
);

app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
