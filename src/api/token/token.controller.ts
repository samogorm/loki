import IToken from './token.interface';
import Token from './token.schema';


const TokenController = {
  create: (data: any) => {
    const token = new Token(data);

    return token.save(function (err: any, doc: IToken) {
      const success = err ? false : true;

      if (success) {
       return true;
      }

      return false;
    });
  },

  get: async (data: any) => {
    const { req, res } = data;
    const tokenId = req.params.token_id;
    let error: boolean = false;
    let errorMessage: any = null;

    const token = await Token.findById(tokenId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Auth Token.',
        data: token
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let tokens: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await Token.find()
      .then(data => tokens = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Auth Token.',
        data: tokens
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  update: async (data: any) => {
    const { req, res } = data;
    const tokenId = req.params.token_id;

    let error: boolean = false;
    let errorMessage: any = null;

    const token = await Token.findOneAndUpdate({ _id: tokenId }, req.body, (err: any, updatedToken: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return updatedToken;
    });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the Token.',
        data: token
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  }
}

export default TokenController;
