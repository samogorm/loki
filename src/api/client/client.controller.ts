import IClient from './client.interface';
import Client from './client.schema';

class ClientController {

  static create = (data: any) => {
    const { req, res } = data;
    const { name, url, secret, grantType } = req.query;

    const client = new Client({ name, url, secret, grantType });
    
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
  }

  static getAll = async (data: any) => {
    const { req, res } = data;
    let clients: any = [];
  
    await Client.find()
      .then(data => clients = data);
  
    if (clients) {
      return res.status(200).json({
        message: 'Successfully retrieved the Clients.',
        data: clients
      });
    }

    return res.status(500).json({
      message: 'There was an issue with this request.',
      data: null
    });
  }

}

export default ClientController;
