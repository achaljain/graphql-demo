module.exports = `
  type Account {
    accountToken: String!
    accountType: String!
    accountNumber: String!
    accountBalance: Float!
    nickName: String
  }

  input AccountInput {
    accountToken: String!
    accountType: String!
    accountNumber: String!
    accountBalance: Float!
    nickName: String
  }
`;
