import { RoleSchema as Role, IRole } from './index';

class RoleController {
  getById(id: string) {
    return Role.findById(id);
  }

  getAll() {
    return Role.find().then(client => client);
  }

  update(id: string, data: any) {
    return Role.findOneAndUpdate({ _id: id }, data, { new: true }).then(role => role);
  }

  create(data: any) {
    const { title, uniqueId, description } = data;
    const client = new Role({ title, uniqueId, description });

    return client.save().then(client => client);
  }
}

export default RoleController;
