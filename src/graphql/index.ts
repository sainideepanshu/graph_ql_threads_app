import { ApolloServer } from "@apollo/server";
import { User } from "./user"

async function createApolloGraphqlServer(){

    // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const gqlServer = new ApolloServer({
    typeDefs: `
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


/* 

const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello: String
            say (name: String): String 
        }
        type Mutation{
            createUser(firstName: String!,lastName: String!,email: String!,password: String!) : Boolean
        }
    `,
    resolvers: {
      Query: {
        hello: () => "Happy Raksha Bandhan",
        say: (_, { name }: { name: String }) => `Hey ${name} , Jai Shree Ram`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "rainbow_salt",
            },
          });

          return true;
        },
      },
    },
  });

*/