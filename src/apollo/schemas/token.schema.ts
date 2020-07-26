export const TokenSchema = `
  type Token {
    _id: String!,
    type: String!,
    token: String!,
    user: User!,
    client: Client!,
    expiresAt: String,
    createdAt: String,
    updatedAt: String
  }
`;