const { withFilter } = require('graphql-yoga');

const Subscription = {
  // USER
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
  },
  userUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userUpdated'),
  },
  userDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userDeleted'),
  },

  // POST
  postCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('postCreated'),
      (payload, variables) => {
        // console.log('payload:', payload);
        // console.log('variables:', variables);
        return variables.user_id
          ? payload.postCreated.user_id === variables.user_id
          : true;
      }
    ),
  },
  postUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('postUpdated'),
  },
  postDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('postDeleted'),
  },
  postCount: {
    subscribe: async (_, __, { pubsub, _db }) => {
      const postCount = await _db.Post.countDocuments();
      setTimeout(() => {
        pubsub.publish('postCount', { postCount: db.posts.length });
      }, 1000);
      return pubsub.asyncIterator('postCount');
    },
  },

  // COMMENT
  commentCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('commentCreated'),
      (payload, variables) => {
        return variables.post_id
          ? payload.commentCreated.post_id === variables.post_id
          : true;
      }
    ),
  },
  commentUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('commentUpdated'),
  },
  commentDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('commentDeleted'),
  },
};

module.exports = Subscription;
