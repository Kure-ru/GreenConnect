const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { userExtractor } = require("../utils/middleware");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

postsRouter.get("/", async (request, response) => {
  const posts = await Post.find({}).populate("user", { username: 1, name: 1 });
  console.log(posts)
  response.json(posts);
});

postsRouter.post("/", userExtractor, async (request, response) => {
  console.log(request.body)
    const { title, content } = request.body;

  const post = new Post({
    title,
    content,
  });

  const token = getTokenFrom(request);

  console.log(token)

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  post.user = user._id;

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.status(201).json(savedPost);
});

module.exports = postsRouter;
