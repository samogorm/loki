import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import UserController from './../api/user/user.controller';

const schema = buildSchema('./schema/schema.graphql');

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
