const { merge } = require('lodash');

const AccountResolvers = require('./account/account.resolvers');
const UserResolvers = require('./user/user.resolvers');
const QueryResolvers = require('./queries/queries.resolvers');
const MutationResolvers = require('./mutations/mutations.resolvers');

module.exports = merge(
  QueryResolvers,
  MutationResolvers,
  AccountResolvers,
  UserResolvers
);
