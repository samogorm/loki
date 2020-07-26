export const Query = `
  type Query {
    user(id: String!): User
    users: [User]
    client(id: String!): Client
    clients: [Client]
  }
`;