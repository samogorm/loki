export const ClientMutations = `
  createClient(name: String!, url: String!, secret: String!, grantType: String!, brand: String): Client
  updateClient(id: String!, name: String, url: String, secret: String, grantType: String, active: Boolean): Client
`;
