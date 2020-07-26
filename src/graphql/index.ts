import { ApolloServer } from 'apollo-server-express';

import { UserSchema } from './schemas';
import { UserResolver } from './resolvers';

const apolloServer = () => {
  const typeDefs = [ UserSchema ];
  const resolvers = UserResolver;

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  console.log('Server: ', server);

  return server;
}

export default apolloServer;