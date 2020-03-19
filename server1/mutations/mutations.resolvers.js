const fs = require('fs')
const path = require('path')

const databasePath = path.join(__dirname, '../database')
const userList = require(databasePath + '/users.json')
const accountList = require(databasePath + '/accounts.json')

const resolvers = {
  Mutation: {
    addUser: (parent, args) => {
      const {user} = args
      const {userId} = user
      userList[userId] = user

      return new Promise((resolve, reject) => {
        fs.writeFile(databasePath + '/users.json', JSON.stringify(userList), 'utf8', (err, data) => {
          if(err) {
            reject(err)
          } else {
            resolve(user)
          }
        })
      })
    },

    addAccount: (parent, args) => {
      const {userId, account} = args
  
      if(accountList[userId]) {
        accountList[userId].push(account)
      } else {
        accountList[userId] = [account]
      }

      return new Promise((resolve, reject) => {
        fs.writeFile(databasePath + '/accounts.json', JSON.stringify(accountList), 'utf8', (err, data) => {
          if(err) {
            reject(err)
          } else {
            resolve(account)
          }
        })
      })
    }
  },
};

module.exports = resolvers;
