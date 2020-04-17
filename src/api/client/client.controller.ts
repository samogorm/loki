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
          message: 'Successfully created Client',
          data: result
        });
      }

      return res.status(500).json({
        message: 'There was an issue with this request.',
        data: err
      });
    });
  }
}

export default ClientController;
