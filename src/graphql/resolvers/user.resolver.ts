import UserController from './../../api/user/user.controller';

export const UserResolver = {
  Query: {
    user: (parent: any, args: any, context: any, info: any) => UserController.getById(args.id),
    users: () => UserController.getAll(),
  },
  Mutation: {
    createUser: (parent: any, args: any, context: any, info: any) => UserController.create(args)
  }
};
