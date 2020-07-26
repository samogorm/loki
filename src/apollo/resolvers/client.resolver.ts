import { ClientController } from './../../api/client';

export const ClientResolver = {
  Query: {
    client: (parent: any, args: any, context: any, info: any) => console.log(args),
    clients: () => null,
  },
  Mutation: {
    createClient: (parent: any, args: any, context: any, info: any) => ClientController.create(args)
  }
};
