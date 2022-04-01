const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Mutation = {
  // User
  createUser: async (_, { data }, { pubsub, _db }) => {
    const newUser = new _db.User({
      ...data,
    });
    const user = await newUser.save();
    pubsub.publish('userCreated', { userCreated: user });
    return user;
  },
  updateUser: async (_, { id, data }, { pubsub, _db }) => {
    const is_user_exist = await _db.User.findById(id);
    if (!is_user_exist) {
      throw new Error('User not found!');
    }
    const updatedUser = await _db.User.findByIdAndUpdate(id, data, {
      new: true,
    });
    pubsub.publish('userUpdated', {
      userUpdated: updatedUser,
    });

    return updatedUser;
  },

  deleteUser: async (_, { id }, { pubsub, _db }) => {
    const is_user_exist = await _db.User.findById(id);
    if (!is_user_exist) {
      throw new Error('User not found!');
    }
    const deletedUser = await _db.User.findByIdAndDelete(id);
    pubsub.publish('userDeleted', { userDeleted: deletedUser });
    return deletedUser;
  },
  deleteAllUser: async (_, __, { _db }) => {
    const delete_users = await _db.User.deleteMany({});
    return {
      count: delete_users.deletedCount,
    };
  },

  // Post
  createPost: async (_, { data }, { pubsub, _db }) => {
    const newPost = new _db.Post({
      ...data,
    });
    const post = await newPost.save();
    const user = await _db.User.findById(mongoose.Types.ObjectId(data.user));
    user.posts.push(post.id);
    user.save();

    const postCount = await _db.Post.countDocuments();
    pubsub.publish('postCreated', {
      postCreated: post,
    });
    pubsub.publish('postCount', { postCount });
    return post;
  },
  updatePost: async (parent, { id, data }, { pubsub, _db }) => {
    const is_post_exist = await _db.Post.findById(id);

    if (!is_post_exist) {
      throw new Error('Post not found');
    }
    const updatedPost = _db.Post.findByIdAndUpdate(id, data, {
      new: true,
    });
    pubsub.publish('postUpdated', { postUpdated: updatedPost });

    return updatedPost;
  },
  deletePost: async (parent, { id }, { pubsub, _db }) => {
    const is_post_exist = await _db.Post.findById(id);
    if (!is_post_exist) {
      throw new Error('Post not found!');
    }
    const deletedPost = await _db.Post.findByIdAndDelete(id);
    const postCount = await _db.Post.countDocuments();
    pubsub.publish('postDeleted', { postDeleted: deletedPost });
    pubsub.publish('postCount', { postCount });

    return deletedPost;
  },
  deleteAllPost: async (_, __, { _db }) => {
    const delete_posts = await _db.Post.deleteMany({});
    return {
      count: delete_posts.deletedCount,
    };
  },

  // Comment
  createComment: async (parent, { data }, { pubsub, _db }) => {
    const newComment = await new _db.Comment(data);
    const createdComment = newComment.save();

    const post = await _db.Post.findById(mongoose.Types.ObjectId(data.post));
    const user = await _db.User.findById(mongoose.Types.ObjectId(data.user));

    user.comments.push(createdComment.id);
    post.comments.push(createdComment.id);

    await user.save();
    await post.save();

    pubsub.publish('commentCreated', { commentCreated: createdComment });
    return createdComment;
  },
  updateComment: async (parent, { id, data }, { pubsub, _db }) => {
    const is_comment_exist = await _db.Comment.findById(id);

    if (!is_comment_exist) {
      throw new Error('Post not found');
    }
    const updatedComment = _db.Comment.findByIdAndUpdate(id, data, {
      new: true,
    });
    pubsub.publish('commentUpdated', { commentUpdated: updatedComment });
    return updatedComment;
  },
  deleteComment: async (parent, { id }, { pubsub, _db }) => {
    const is_comment_exist = await _db.Comment.findById(id);
    if (!is_comment_exist) {
      throw new Error('Post not found!');
    }
    const deletedComment = await _db.Comment.findByIdAndDelete(id);
    pubsub.publish('commentDeleted', { commentDeleted: deletedComment });
    return deletedComment;
  },
  deleteAllComment: async (_, __, { _db }) => {
    const delete_comments = await _db.Comment.deleteMany({});
    return {
      count: delete_comments.deletedCount,
    };
  },
};

module.exports = Mutation;
