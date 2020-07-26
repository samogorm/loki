export const Mutation = `
  type Mutation {
    activateUser(activateToken: String!): User
    createUser(name: String!, email: String!, password: String!, permissions: [String], active: Boolean, clientId: String!): User
    updateUser(id: String!, name: String, email: String, password: String, permissions: [String], active: Boolean): User
    updateUserPassword(password: String!, resetToken: String!): User
    createClient(name: String!, url: String!, secret: String!, grantType: String!, brand: String): Client
    updateClient(id: String!, name: String, url: String, secret: String, grantType: String, active: Boolean): Client
  }
`;
