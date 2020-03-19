import {gql} from 'apollo-boost'

export const getUser = gql`
    query getUser($userId: String!) {
        getUser(userId: $userId) {
            userId
            firstName
            lastName
            accounts {
                accountToken
                accountType
                accountNumber
            }
        }
    }
`