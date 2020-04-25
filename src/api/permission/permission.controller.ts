import IPermission from './permission.interface';
import Permission from './permission.schema';

const PermissionController = {
  create: (data: any) => {
    const { req, res } = data;
    const permission = new Permission(req.body);

    return permission.save(function (err: any, permission: IPermission) {
      const success = err ? false : true;
      const result = err ? err : permission;

      if (success) {
        return res.status(201).json({
          message: 'Successfully created Permission.',
          data: result
        });
      }

      return res.status(500).json({
        message: err,
        data: null
      });
    });
  },

  get: async (data: any) => {
    const { req, res } = data;
    const permissionId = req.params.permission_id;
    let error: boolean = false;
    let errorMessage: any = null;
    
    const permission = await Permission.findById(permissionId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Permission.',
        data: permission
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let permissions: any = [];
    let error: boolean = false;
    let errorMessage: any = null;
  
    await Permission.find()
      .then(data => permissions = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });
  
    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Permissions.',
        data: permissions
      });
    } 

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  update: async (data: any) => {
    const { req, res } = data;
    const permissionId = req.params.permission_id;
  
    let error: boolean = false;
    let errorMessage: any = null;

    const permission = await Permission.findOneAndUpdate({ _id: permissionId }, req.body, (err: any, updatedPermission: any) => {
      if (err) {
        error = true;
        errorMessage = err;
      }

      return updatedPermission;
    });
 
    if (!error) {
      return res.status(200).json({
        message: 'Successfully updated the Permission.',
        data: permission
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  }
}

export default PermissionController;
