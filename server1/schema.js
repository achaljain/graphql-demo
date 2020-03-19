const Account = require('./account/account.schema');
const User = require('./user/user.schema');
const Query = require('./queries/queries.schema');
const Mutation = require('./mutations/mutations.schema');

module.exports = [Query, Mutation, Account, User];
