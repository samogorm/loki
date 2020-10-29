export const RoleMutations = `
  createRole(title: String!, uniqueId: String!, description: String!): Role
  updateRole(title: String!, uniqueId: String!, description: String!, active: Boolean): Role
`;
