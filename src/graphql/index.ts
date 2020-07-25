import { ApolloServer, gql } from 'apollo-server-express';

import UserController from './../api/user/user.controller';

const apolloServer = () => {
  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        user(name: String!): User
        users: [User]
      }
  
      type Mutation {
        createUser(name: String!, email: String!, password: String!, permissions: [String], active: Boolean): User
      }
  
      type User {
        id: String!,
        name: String!,
        email: String!,
        password: String!,
        permissions: [String!],
        active: Boolean,
        createdAt: String,
        updatedAt: String
      }
    `,
    resolvers: {
      Query: {
        user: (input: String) => UserController.get({ name: input }),
        users: () => UserController.getAll(),
      },
      Mutation: {
        createUser: (input: any) => UserController.create(input)
      }
    }
  });

  return server;
}

export default apolloServer;