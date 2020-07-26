import { UserModel as User, UserInterface as IUser } from './index';
import ClientModel from '../client/client.model';
import Register from './../auth/register.controller';
import { Encryption } from './../../helpers';

const UserController = {
  create: async (data: any) => {
    const user = new User(data);
    user.password = Encryption.encrypt(data.password);

    return user.save().then(user => user);
  },

  getById: (id: String) => User.findById(id),

  getAll: () => User.find().then(users => users),

  update: async (data: any) => {
    const { req, res } = data;
    const userId = req.params.user_id;

    let error: boolean = false;
    let errorMessage: any = null;

    const user = await User.findOneAndUpdate({ _id: userId }, req.body, (err: any, doc: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return doc;
    });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the User.',
        data: user
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },
}

export default UserController;
