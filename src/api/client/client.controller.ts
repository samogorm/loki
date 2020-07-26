import { ClientModel as Client, ClientInterface as IClient } from './index';
import { Encryption } from './../../helpers';

const ClientController = {
  create: (data: any) => {
    const { name, url, secret, grantType, brand } = data;
    const client = new Client({ name, url, grantType, brand, secret: Encryption.encrypt(secret) });

    return client.save().then(client => client);
  },

  get: async (data: any) => {
    const { req, res } = data;
    const clientId = req.params.client_id;
    let error: boolean = false;
    let errorMessage: any = null;

    const client = await Client.findById(clientId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Client.',
        data: client
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let clients: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await Client.find()
      .then(data => clients = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Clients.',
        data: clients
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  update: async (data: any) => {
    const { req, res } = data;
    const clientId = req.params.client_id;

    let error: boolean = false;
    let errorMessage: any = null;

    const client = await Client.findOneAndUpdate({ _id: clientId }, req.body, (err: any, updatedClient: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return updatedClient;
    });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the Client.',
        data: client
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  validate: async (client: IClient, secret: any) => {
    return Encryption.decrypt(secret) === Encryption.decrypt(client.secret);
  }
}

export default ClientController;
