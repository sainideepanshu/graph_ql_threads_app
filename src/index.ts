import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello: String
            say (name: String): String 
        }
    `,
    resolvers: {
      Query: {
        hello: () => "Happy Raksha Bandhan",
        say: (_ , {name}:{name:String}) => `Hey ${name} , Jai Shree Ram`
      },
    },
  });

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();
