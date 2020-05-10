import Client from './client.schema';
import IClient from './client.interface';
import { Encryption } from './../../helpers';

const ClientModel = {
  findBy: async (key: any, value: any) => {
    let result: any;

    await Client.findOne({ [key]: value })
      .then(client => result = client)
      .catch(err => {
        console.log(err);
        result = null;
      });

    return result;
  },

  validate: async (client: IClient, secret: any) => {
    return Encryption.decrypt(secret) === Encryption.decrypt(client.secret);
  }
}

export default ClientModel;
