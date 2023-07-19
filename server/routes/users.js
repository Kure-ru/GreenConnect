const usersRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

// authentification
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

// création de profil
usersRouter.post("/profile", async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

// modification profil
usersRouter.put("/:id", (req, res) => {});

// afficher profil
usersRouter.get("/:id", (req, res) => {});

// afficher tous les utilisateurs
usersRouter.get("/", (req, res) => {
  console.log("users");
  // populate
});

module.exports = usersRouter;
