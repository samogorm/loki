import { RoleController } from './../../api/role';

const roleController = new RoleController();

export const roleResolver = {
  Query: {
    role: (parent: any, args: any, context: any, info: any) => roleController.getById(args.id),
    roles: () => roleController.getAll(),
  },
  Mutation: {
    createClient: (parent: any, args: any, context: any, info: any) => {
      return roleController.create(args);
    },
    updateClient: (parent: any, args: any, context: any, info: any) => {
      const { id, title, uniqueId, description, active } = args;
      return roleController.update(id, { title, uniqueId, description, active });
    },
  }
};
