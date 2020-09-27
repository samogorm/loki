import LoginSession from './login_session.schema';

class LoginSessionController {
  async create(data: any) {
    const loginSession = new LoginSession(data);

    return loginSession.save((err: any) => !err);
  }

  async get(data: any) {
    const { req, res } = data;
    const sessionId = req.params.session_id;
    let error: any = null;

    const session = await LoginSession.findById(sessionId)
      .catch(err => error = err);

    if (error) {
      return error;
    }

    return session;
  }

  async getAll(data: any) {
    const { res } = data;
    let sessions: any = [];
    let error: boolean = false;
    let errorMessage: any = null;

    await LoginSession.find()
      .then(items => sessions = items)
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
  }
}

export default LoginSessionController;
