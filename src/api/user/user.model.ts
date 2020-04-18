import User from './user.schema';

const UserModel = {
  checkEmailExists: async (email: string) => {
    let emailTaken;
    await User.findOne({ email: email })
      .then(data => emailTaken = data);

    return emailTaken;
  },

  findBy: async (key: any, value: any) => {
    let result: any;

    await User.findOne({ [key]: value })
      .then(data => result = data)
      .catch(err => {
        console.log(err);
        result = null;
      });

    return result;
  },
}

export default UserModel;
