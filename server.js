const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // middleware
  server.use(express.json()); // to parse json

  server.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    res.json({
      email,
      password,
      success: true,
    });
  });

  // we are routing all the get calls to be handled by next
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`The server is listening on port http://localhost:${port}`);
  });
});
