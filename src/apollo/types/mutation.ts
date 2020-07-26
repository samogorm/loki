export const Mutation = `
  type Mutation {
    createUser(name: String!, email: String!, password: String!, permissions: [String], active: Boolean, clientId: String!): User
    updateUser(id: String!, name: String, email: String, password: String, permissions: [String], active: Boolean): User
    createClient(name: String!, url: String!, secret: String!, grantType: String!, brand: String): Client
  }
`;
