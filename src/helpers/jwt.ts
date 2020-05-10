require('dotenv').config();

import jwt from 'jsonwebtoken';

export const JSONWebToken = {
  generate: (email: string) => {
    const payload = { user: email };
    const options = {
      expiresIn: `${process.env.JWT_EXPIRY}d`,
      issuer: `${process.env.JWT_ISSUER}`
    };

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, `${secret}`, options);

    return token;
  },

  validate: (req: any, res: any, next: Function) => {
    const authorizationHeader = req.headers.authorization;

    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1];
      const options = {
        expiresIn: process.env.JWT_EXPIRY,
        issuer: process.env.JWT_ISSUER
      };

      try {
        result = jwt.verify(token, `${process.env.JWT_SECRET}`, options);
        req.decoded = result;
        next();
      } catch (err) {
        throw new Error(err);
      }

    } else {

      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };

      res.status(401).send(result);
    }
  }
}
