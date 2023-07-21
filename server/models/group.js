const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      type: String,
    }
  ],
  posts: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Post"
  }]
});

groupSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
