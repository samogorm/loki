import Server from './server';

const server = new Server();
server.start(process.env.APP_PORT || 5000);
