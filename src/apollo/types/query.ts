export const Query = `
  type Query {
    login(email: String!, password: String!, clientId: String!, clientSecret: String!): Token
    user(id: String!): User
    users: [User]
    client(id: String!): Client
    clients: [Client]
  }
`;