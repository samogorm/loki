import Token from './token.schema';

class TokenController {
  static create(data: object) {
    const token = new Token(data);

    return token.save();
  }
}

export default TokenController;
