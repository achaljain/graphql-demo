const userData = require('../database/users.json');
const accountData = require('../database/accounts.json');

const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return userData[args.userId]
    },

    getAccounts: (parent, args, context, info) => {
      return accountData[args.userId]
    }
  },
};

module.exports = resolvers;
