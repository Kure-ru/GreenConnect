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
usersRouter.post("/", async (req, res) => {
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
usersRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const user = {
    username: body.username,
    interests: body.interests,
  };

  User.findByIdAndUpdate(request.params.id, user, { new: true })
    .then((updatedUser) => {
      response.json(updatedUser);
    })
    .catch((error) => next(error));
});

// afficher profil
usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  console.log(request.params.id)
  if (user) {
    console.log(`user is ${user}`)
    response.json(user);
  } else {
    response.status(404).end();
  }
});

// afficher tous les utilisateurs
usersRouter.get("/", (req, res) => {
  console.log("users");
  // populate
});

module.exports = usersRouter;
