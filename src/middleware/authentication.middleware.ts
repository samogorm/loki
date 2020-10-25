require('dotenv').config();

import express from 'express';
import  { tokenSchema as Token } from '../api/token';
import { UserModel as User } from '../api/user';
import { ClientModel as Client } from '../api/client';

class AuthenticationMiddleware {
  isAuthenticated = async (request: express.Request, response: express.Response, next: Function) => {
    const unauthorizedMessage = {
      error: `Unauthorized`,
      status: 401
    };

    const authorizationHeader = request.headers.authorization;
    const referer = request.headers.referer || null;
    const devMode = process.env.NODE_ENV === 'development';
    const postmanRequest = request.headers['user-agent']?.toLowerCase().includes('postman');
    let bypassReferer = false;

    if (!referer && (devMode && postmanRequest)) {
      console.log('Bypassing the referer for Postman request.');
      bypassReferer = true;
    }

    if (authorizationHeader) {
      const authToken = authorizationHeader.split(' ')[1];
      
      const token: any = await Token.find({ token: authToken }).then((item: any) => item);
      const user: any = await User.findById(token[0].user._id.toString());
      const client: any = await Client.findById(token[0].client._id.toString());
      const hasAccessToClient = client.url === referer;

      if (!user.active || (!hasAccessToClient && !bypassReferer)) {
        response.status(401).send(unauthorizedMessage);
      } else {
        next();
      }
    } else {
      response.status(401).send(unauthorizedMessage);
    }
  }

  async isAuthorized(id: string, request: any) {
    const authorizationHeader = request.headers.authorization;
    let result;

    if (authorizationHeader) {
      const authToken = authorizationHeader.split(' ')[1];

      result = await Token.find({ token: authToken })
        .then((token: any) => token[0].user._id.toString() === id);
    } else {
      result = false;
    }
    return result;
  }
}

export default AuthenticationMiddleware;
