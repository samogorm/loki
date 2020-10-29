import { UserMutations } from './user.mutation';
import { ClientMutations } from './client.mutation';
import { RoleMutations } from './role.mutation';

export const Mutation = `
  type Mutation {
    ${UserMutations}
    ${ClientMutations}
    ${RoleMutations}
  }`;
