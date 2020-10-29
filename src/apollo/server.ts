import { ApolloServer } from 'apollo-server-express';
const { applyMiddleware } = require('graphql-middleware');

import { Mutation, Query } from './types';
import { UserSchema, ClientSchema, TokenSchema } from './schemas';
import { UserResolver, ClientResolver, RoleResolver } from './resolvers';

const apolloServer = () => {
  const typeDefs = [ Mutation, Query, UserSchema, ClientSchema, TokenSchema ];
  const resolvers = {
    Query: { ...UserResolver.Query, ...ClientResolver.Query, ...RoleResolver.Query },
    Mutation: { ...UserResolver.Mutation, ...ClientResolver.Mutation, ...RoleResolver.Mutation }
  }
 
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        req,
      };
    },
  });

  return server;
}

export default apolloServer;