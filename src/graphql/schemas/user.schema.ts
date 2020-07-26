export const UserSchema = `
  type Query {
    user(id: String!): User
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, permissions: [String], active: Boolean): User
  }

  type User {
    _id: String!,
    name: String!,
    email: String!,
    password: String!,
    permissions: [String!],
    active: Boolean,
    createdAt: String,
    updatedAt: String
  }
`;