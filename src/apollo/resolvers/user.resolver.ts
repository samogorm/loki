import { UserController } from '../../api/user';
import { AuthenticationController } from '../../api/authentication'

export const userResolver = {
  Query: {
    login: (parent: any, args: any, context: any, info: any) => {
      const { email, password, clientId, clientSecret } = args;
      const authController = new AuthenticationController();

      return authController.login(email, password, { clientId, clientSecret });
    },
    resetPassword: (parent: any, args: any, context: any, info: any) => {
      const authController = new AuthenticationController();
      authController.resetPassword(args.email, args.clientId);
    },
    user: (parent: any, args: any, context: any, info: any) => UserController.getById(args.id),
    users: () => UserController.getAll(),
    sendActivationEmail: (parent: any, args: any, context: any, info: any) => {
      const authController = new AuthenticationController();
      authController.resendActivationEmail(args.email, args.clientId);
    },
  },
  Mutation: {
    activateUser: (parent: any, args: any, context: any, info: any) => {
      const authController = new AuthenticationController();
      authController.activate(args.activateToken);
    },
    createUser: (parent: any, args: any, context: any, info: any) => UserController.create(args),
    updateUser: (parent: any, args: any, context: any, info: any) => {
      const { id, name, email, password, active, permissions } = args;
      return UserController.update(id, name, email, password, active, permissions);
    },
    updateUserPassword: (parent: any, args: any, context: any, info: any) => {
      UserController.updatePassword(args.password, args.resetToken);
    },
  }
};
