import LoginSession from './login_session.schema';

const LoginSessionController = {
  create: async (data: any) => {
    const loginSession = new LoginSession(data);

    return loginSession.save(function (err: any) {
      if (err) {
        return false;
      }

      return true;
    });
  },

  get: async (data: any) => {
    const { req, res } = data;
    const sessionId = req.params.session_id;
    let error: boolean = false;
    let errorMessage: any = null;

    const session = await LoginSession.findById(sessionId)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Login Session.',
        data: session
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },

  getAll: async (data: any) => {
    const { res } = data;
    let sessions: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await LoginSession.find()
      .then(data => sessions = data)
      .catch(err => {
        error = true;
        errorMessage = err;
      });

    if (!error) {
      return res.status(200).json({
        message: 'Successfully retrieved the Login Sessions.',
        data: sessions
      });
    }

    return res.status(500).json({
      message: errorMessage,
      data: null
    });
  },
};

export default LoginSessionController;
