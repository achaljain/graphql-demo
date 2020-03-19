module.exports = `
  type User {
    userId: String!
    firstName: String!
    lastName: String!
    accounts: [Account]
  }

  input UserInput {
    userId: String!
    firstName: String!
    lastName: String!
  }
`;
