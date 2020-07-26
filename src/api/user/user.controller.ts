import { ClientModel as Client } from './../client';
import { UserModel as User } from './index';
import { Encryption } from './../../helpers';
import Register from './../auth/register.controller';

const UserController = {
  getById: (id: String) => User.findById(id),

  getAll: () => User.find().then(users => users),

  create: async (data: any) => {
    const { name, email, password, clientId } = data;
    const client = await Client.findOne({ _id: clientId }).then(client => client);
    const user = new User({ name, email, password: Encryption.encrypt(password)});

    return user.save().then(user => {
      Register.sendActivationEmail(client, user);

      return user;
    });
  },

  update: (id: String, name: String, email: String, password: any, active: Boolean, permissions: any) => {
    const data = { name, email, password: Encryption.encrypt(password), active, permissions };

    return User.findOneAndUpdate({ _id: id }, data, { new: true }).then(user => user);
  }
}

export default UserController;
