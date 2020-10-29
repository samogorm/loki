import { ClientModel as Client, IClient } from './index';
import { Encryption } from './../../helpers';

class ClientController {
  getById(id: string) {
    return Client.findById(id);
  }

  getAll() {
    return Client.find().then(client => client);
  }

  update(id: string, data: any) {
    data.secret = Encryption.encrypt(data.secret);

    return Client.findOneAndUpdate({ _id: id }, data, { new: true }).then(client => client);
  }

  create(data: any) {
    const { name, url, secret, grantType, brand } = data;
    const client = new Client({ name, url, grantType, brand, secret: Encryption.encrypt(secret) });

    return client.save().then(client => client);
  }

  validate(client: IClient, secret: any) {
    return Encryption.decrypt(secret) === Encryption.decrypt(client.secret);
  }
}

export default ClientController;
