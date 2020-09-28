import { ClientModel as Client } from './../client';
import { UserModel as User, UserInterface as IUser } from './index';
import { Encryption } from './../../helpers';
import { AuthenticationController } from '../authentication';

class UserController {
  getById(id: string) {
    return User.findById(id);
  }

  getAll() {
    User.find().then(users => users);
  }

  async create(data: any) {
    const { name, email, password, clientId } = data;
    const client = await Client.findOne({ _id: clientId }).then(client => client);
    const user = new User({ name, email, password: Encryption.encrypt(password)});

    return user.save().then(user => {
      const authenticationController = new AuthenticationController();
      authenticationController.sendActivationEmail(client, user);

      return user;
    });
  }

  async update(id: string, name: string, email: string, password: string, active: boolean, permissions: any) {
    const data = { name, email, password: Encryption.encrypt(password), active, permissions };

    return User.findOneAndUpdate({ _id: id }, data, { new: true }).then(user => user);
  }
}

export default UserController;
