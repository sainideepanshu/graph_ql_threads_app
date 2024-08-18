import { prismaClient } from "../../lib/db";


const queries = {
  hello: () => "Happy Raksha Bandhan",
  say: (_:any, { name }: { name: String }) => `Hey ${name} , Jai Shree Ram`,
};

const mutations = {
  createUser: async (
    _:any,
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

    return '';
  },
};

export const resolvers = { queries, mutations };
