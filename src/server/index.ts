require('dotenv').config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';

import router from './../router';
import RouteMiddleware from './../router/route.middleware';
import UserController from './../api/user/user.controller';

class Server {
  private readonly SERVER_STARTED = `Running API on port:`;

  public start = (port: any) => {
    const app = express();
    const routeMiddleware = new RouteMiddleware();
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
          users: () => UserController.getAll(''),
        },
        Mutation: {
          createUser: (input: any) => UserController.create(input)
        }
      }
    })

    server.applyMiddleware({ app })
    app.use(cors());
    app.use(routeMiddleware.logRoute);
    app.use(bodyParser.json());
    app.use('/api/v1', router);

    mongoose.connect(`${process.env.MONGO_LOCAL_CONN_URL}${process.env.MONGO_DB}` || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(port);

    console.log(`${this.SERVER_STARTED} ${port}`);
    console.log(`GraphiQL: ${process.env.APP_HOST}:${process.env.APP_PORT}/graphql`);
  };
}

export default Server;
