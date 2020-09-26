import { UserQuery } from './user.query';
import { ClientQuery } from './client.query';

export const Query = `
  type Query {
    ${UserQuery}
    ${ClientQuery}
  }
`;
