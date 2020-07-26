export const ClientSchema = `
  type Client {
    _id: String!,
    name: String!,
    url: String!,
    secret: String!,
    grantType: String!,
    brand: Brand,
    active: Boolean,
    createdAt: String,
    updatedAt: String
  }

  type Brand {
    logo: String,
    colours: Colours
  }

  type Colours {
    primary: String,
    secondary: String,
  }
`;