const User = {
  posts: async (parent, args, { _db }) =>
    await _db.Post.find({ user: parent.id }),
  comments: async (parent, __, { _db }) =>
    await _db.Comment.find({ user: parent.id }),
};

module.exports = User;
