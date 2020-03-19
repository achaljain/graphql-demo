const Mutation = `
  type Mutation {
    addUser(user: UserInput!): User

    addAccount(userId: String!, account: AccountInput!): Account
  }
`;

module.exports = Mutation;
