import { ClientController } from './../../api/client';

const clientController = new ClientController();

export const clientResolver = {
  Query: {
    client: (parent: any, args: any, context: any, info: any) => clientController.getById(args.id),
    clients: () => clientController.getAll(),
  },
  Mutation: {
    createClient: (parent: any, args: any, context: any, info: any) => {
      return clientController.create(args);
    },
    updateClient: (parent: any, args: any, context: any, info: any) => {
      const { id, name, url, secret, active, grantType } = args;
      return clientController.update(id, { name, url, secret, active, grantType });
    },
  }
};
