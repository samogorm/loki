require('dotenv').config();

import express from 'express';
import  { tokenSchema as Token } from '../api/token';

class AuthenticationMiddleware {
  isAuthenticated = (request: express.Request, response: express.Response, next: Function) => {
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
      
      Token.find({ token: authToken })
        .then((token: any) => {
          const { active } = token[0].user; // TODO: find the user object and check active there.
          const { url } = token[0].client; // TODO: find the client object and check the url there.
          const hasAccessToClient = url === referer;
      
          if (!active || (!hasAccessToClient && !bypassReferer)) {
            response.status(401).send(unauthorizedMessage);
          }

          next();
        }).catch((err: any) => {
          response.send(err);
        });
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
        .then((token: any) => token[0].user._id.toString() === id)
        .catch((err: any) => false);
    } else {
      result = false;
    }
    return result;
  }
}

export default AuthenticationMiddleware;
