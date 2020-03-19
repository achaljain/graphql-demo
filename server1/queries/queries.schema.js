const Query = `
  type Query {
    getUser(userId: String!): User

    getAccounts(userId: String!): [Account]
  }
`;

module.exports = Query;
