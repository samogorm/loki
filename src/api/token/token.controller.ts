import Token from './token.schema';

class TokenController {
  static create(data: object) {
    const token = new Token(data);

    return token.save();
  }

  static expire(token: string) {
    const now = new Date();
    return Token.findOneAndUpdate({ token }, { expiresAt: now }, { new: true }).then(updatedRecord => updatedRecord);
  }
}

export default TokenController;
