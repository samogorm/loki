import { UserMutations } from './user.mutation';
import { ClientMutations } from './client.mutation';

export const Mutation = `
  type Mutation {
    ${UserMutations}
    ${ClientMutations}
  }`;
