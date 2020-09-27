import { ClientController } from './../../api/client';

export const clientResolver = {
  Query: {
    client: (parent: any, args: any, context: any, info: any) => ClientController.getById(args.id),
    clients: () => ClientController.getAll(),
  },
  Mutation: {
    createClient: (parent: any, args: any, context: any, info: any) => {
      return ClientController.create(args);
    },
    updateClient: (parent: any, args: any, context: any, info: any) => {
      const { id, name, url, secret, active, grantType } = args;
      return ClientController.update(id, { name, url, secret, active, grantType });
    },
  }
};
