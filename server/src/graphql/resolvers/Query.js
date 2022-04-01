const Query = {
  // User
  users: async (_, __, { _db }) => {
    const users = await _db.User.find();
    return users;
  },
  user: async (parent, args, { _db }) => {
    const user = await _db.User.findById(args.id);
    return user;
  },
  //Post
  posts: async (_, __, { _db }) => {
    const posts = await _db.Post.find();
    return posts;
  },
  post: async (parent, args, { _db }) => {
    const post = await _db.Post.findById(args.id);
    return post;
  },
  //Comments
  comments: async (_, __, { _db }) => {
    const comments = await _db.Comment.find();
    return comments;
  },
  comment: async (parent, args, { _db }) => {
    const comment = await _db.Comment.findById(args.id);
    return comment;
  },
};

module.exports = Query;
