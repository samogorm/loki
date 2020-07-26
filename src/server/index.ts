require('dotenv').config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import apolloServer from './../apollo/server';
import router from './../router';
import RouteMiddleware from './../router/route.middleware';

class Server {
  private readonly SERVER_STARTED = `Running API on port:`;

  public start = (port: any) => {
    const app = express();
    const routeMiddleware = new RouteMiddleware();
    const server = apolloServer();

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
