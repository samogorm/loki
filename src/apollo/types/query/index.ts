import { UserQuery } from './user.query';
import { ClientQuery } from './client.query';
import { RoleQuery } from './role.query';

export const Query = `
  type Query {
    ${UserQuery}
    ${ClientQuery}
    ${RoleQuery}
  }
`;
