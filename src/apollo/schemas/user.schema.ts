export const UserSchema = `
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