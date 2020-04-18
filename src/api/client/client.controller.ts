import IClient from './client.interface';
import Client from './client.schema';
import Encryption from './../../helpers/encryption';

const ClientController = {
  create: (data: any) => {
    const { req, res } = data;

    const client = new Client(req.body);

    client.secret = Encryption.encrypt(req.body.secret);
    
    return client.save(function (err: any, client: IClient) {
      const success = err ? false : true;
      const result = err ? err : client;

      if (success) {
        return res.status(201).json({
          message: 'Successfully created Client.',
          data: result
        });
      }

      return res.status(500).json({
        message: err,
        data: null
      });
    });
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

    const client = await Client.findOneAndUpdate({ _id: clientId }, req.query, (err: any, updatedClient: any) => {
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
  }

}

export default ClientController;
