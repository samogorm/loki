require('dotenv').config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import RouteMiddleware from './route_middleware';
import router from './router';

class Server {
  private readonly SERVER_STARTED = `Running API on port:`;

  public start = (port: any) => {
    const app = express();
    const routeMiddleware = new RouteMiddleware();

    app.use(cors());
    app.use(routeMiddleware.logRoute);
    app.use(bodyParser.json());
    app.use('/api/v1', router);

    mongoose.connect(process.env.MONGO_LOCAL_CONN_URL || '', { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(port);
    console.log(`${this.SERVER_STARTED} ${port}`);
  };
}

export default Server;
