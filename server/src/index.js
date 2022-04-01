const { GraphQLServer, PubSub } = require('graphql-yoga');

const dotenv = require('dotenv');
dotenv.config();

const db = require('./user');

const resolvers = require('./graphql/resolvers');

const mongoDB = require('./db');
mongoDB();

// MODELS
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
// FAKE DATA
const data = require('./user');

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
  resolvers,
  context: {
    pubsub,
    db: data,
    _db: { User, Post, Comment },
  },
});

server.start(() => {
  console.log('Server is running on localhost 4000');
});

// eğer bir obje tipinin sonuna ! konulursa o obje null olamaz NOT NULL
