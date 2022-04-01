const Comment = {
  user: async (parent, args, { _db }) => await _db.User.findById(parent.user),
  post: async (parent, args, { _db }) => await _db.Post.findById(parent.post),
};

module.exports = Comment;
