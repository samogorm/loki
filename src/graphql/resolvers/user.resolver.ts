import UserController from './../../api/user/user.controller';

export const UserResolver = {
  Query: {
    user: (parent: any, args: any, context: any, info: any) => UserController.get(args.id),
    users: () => UserController.getAll(),
  },
  Mutation: {
    createUser: (input: any) => UserController.create(input)
  }
};
