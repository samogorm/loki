import Permission from './permission.schema';

class PermissionController {
  async getOne(data: any) {
    const { req } = data;
    const permissionId = req.params.permission_id;

    return await Permission.findById(permissionId).catch(error => error);
  }

  async getAll() {
    let permissions: any = [];

    await Permission.find()
      .then(data => permissions = data)
      .catch(error => error);

    return permissions;
  }
}

export default PermissionController;
