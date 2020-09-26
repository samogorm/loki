export const UserMutations = `
  activateUser(activateToken: String!): User
  createUser(name: String!, email: String!, password: String!, permissions: [String], active: Boolean, clientId: String!): User
  updateUser(id: String!, name: String, email: String, password: String, permissions: [String], active: Boolean): User
  updateUserPassword(password: String!, resetToken: String!): User
`;
