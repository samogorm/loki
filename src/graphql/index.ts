import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import UserController from './../api/user/user.controller';

const schema = buildSchema(`
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
`);

const rootResolver = {
  user: (input: String) => UserController.get({ name: input }),
  createUser: (input: any) => UserController.create(input),
};

const graphql = graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: true,
});

export default graphql;
