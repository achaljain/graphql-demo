const AccountData = require('../database/accounts.json');

module.exports = {
  User: {
    accounts: (parent, args, context, info) => {
      const {userId} = parent
      const accountsArray = AccountData[userId] || [];
      return accountsArray;
    }
  },
};
