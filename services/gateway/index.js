const { gql, ApolloServer } = require("apollo-server");
const PostsClient = require("./clients/posts");
const ThreadsClient = require("./clients/threads");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Thread {
    id: Int
    created: String
    posts(limit: Int): [Post]
  }

  type Post {
    id: Int
    thread_id: Int
    created: String
  }

  type Query {
    threads(limit: Int): [Thread]
    posts(limit: Int): [Post]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    threads: (...args) => ThreadsClient.threads(args),
    posts: (...args) => PostsClient.posts(args),
  },
  Thread: {
    posts: (...args) => {
      return PostsClient.posts(args);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(8000).then(({ url }) => {
  console.log(`Server started at ${url}`);
});
