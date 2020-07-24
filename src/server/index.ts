require('dotenv').config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Client from './../api/client/client.schema';

import RouteMiddleware from './../router/route.middleware';
import router from './../router';

class Server {
  private readonly SERVER_STARTED = `Running API on port:`;

  public start = (port: any) => {
    const app = express();
    const routeMiddleware = new RouteMiddleware();

    let whitelist: any = ['http://localhost:3000', '*'];

    // await Client.find()
    //   .then(data => {
    //     const client: any = data;
    //     console.log('here')
    //     whitelist.push(client.url);
    //   })
    //   .catch(err => console.log(err));

    const corsOptions = {
      origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    }

    app.use(cors());
    app.use(routeMiddleware.logRoute);
    app.use(bodyParser.json());
    app.use('/api/v1', router);

    mongoose.connect(`${process.env.MONGO_LOCAL_CONN_URL}${process.env.MONGO_DB}` || '', { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(port);
    console.log(`${this.SERVER_STARTED} ${port}`);
    console.log(whitelist);
  };
}

export default Server;
