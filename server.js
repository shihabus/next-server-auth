const next = require("next");
const express = require("express");
const { default: Axios } = require("axios");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = "ipeoipi";
const COOKIE_OPTIONS = {
  httpOnly: true, // to prevent client JS access,
  secure: !dev, // make only https in production
  signed: true, // for source verification
};

const authenticate = async (email, password) => {
  const { data } = await Axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data.find((user) => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};
app.prepare().then(() => {
  const server = express();

  // middleware
  server.use(express.json()); // to parse json
  server.use(cookieParser(COOKIE_SECRET)); // creating signed cookie

  server.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    if (!user) {
      return res.status(403).send("Invalid email or password");
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE,
    };
    res.cookie("token", userData, COOKIE_OPTIONS); // sending cookie to client
    res.json(userData);
  });

  server.post("/api/logout", (req, res) => {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.sendStatus(204);
  });

  server.get("/api/profile", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const { data } = await Axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userProfile = data.find((user) => user.email === token.email);
      return res.json({ user: userProfile });
    }
    res.sendStatus(404);
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
