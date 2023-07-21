const groupsRouter = require("express").Router();
const Group = require("../models/group");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

const { userExtractor } = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// GET afficher tous les groupes
groupsRouter.get("/", async (request, response) => {
  const groups = await Group.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("posts");
  console.log(groups);
  response.json(groups);
});

// POST un nouveau groupe
groupsRouter.post("/", async (request, response) => {
  const { title, description } = request.body;

  const group = new Group({
    title,
    description,
  });

  // find user
  const token = getTokenFrom(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  group.user = user._id;

  const savedGroup = await group.save();
  user.groups = user.groups.concat(savedGroup._id);
  await user.save();

  response.status(201).json(savedGroup);
});

module.exports = groupsRouter;
