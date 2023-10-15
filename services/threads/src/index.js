import { gql, ApolloServer } from "apollo-server";
import Query from "./resolvers/Query.js";

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
    posts(limit: Int, thread_id: Int): [Post]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: Query,
};
const port = process.env.PORT || 4001;
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(port).then(({ url }) => {
  console.log(`Server started at ${url}`);
});
