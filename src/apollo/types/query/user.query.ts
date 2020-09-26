export const UserQuery = `
  login(email: String!, password: String!, clientId: String!, clientSecret: String!): Token
  resetPassword(email: String!, clientId: String!): User
  sendActivationEmail(email: String!, clientId: String!): User
  user(id: String!): User
  users: [User]
`;
