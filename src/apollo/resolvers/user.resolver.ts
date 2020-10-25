import { UserController } from '../../api/user';
import { AuthenticationController } from '../../api/authentication';
import AuthenticationMiddleware from '../../middleware/authentication.middleware';

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
    user: async(parent: any, args: any, context: any, info: any) => {
      const authMiddleware = new AuthenticationMiddleware();
      const isAuthorized = await authMiddleware.isAuthorized(args.id, context.req);

      if (isAuthorized) {
        const userController = new UserController();
        return userController.getById(args.id);
      }

      return null;
    },
    users: (parent: any, args: any, context: any, info: any) => {
      const userController = new UserController();

      return userController.getAll();
    },
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
    createUser: (parent: any, args: any, context: any, info: any) => {
      const userController = new UserController();
      userController.create(args);
    },
    updateUser: async(parent: any, args: any, context: any, info: any) => {
      const { id, name, email, password, active, permissions } = args;
      const userController = new UserController();

      const authMiddleware = new AuthenticationMiddleware();
      const isAuthorized = await authMiddleware.isAuthorized(args.id, context.req);

      if (isAuthorized) {
        return userController.update(id, name, email, password, active, permissions);
      }

      return null;
    },
    updateUserPassword: (parent: any, args: any, context: any, info: any) => {
      const authController = new AuthenticationController();

      authController.updatePassword(args.password, args.resetToken);
    },
  }
};
