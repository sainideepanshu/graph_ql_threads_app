import { ApolloServer } from "@apollo/server";
import { User } from "./user"

async function createApolloGraphqlServer(){

    // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const gqlServer = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
        type Query{
            ${User.queries} 
        }
        type Mutation{
            ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
