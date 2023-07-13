const gql = require('graphql-tag');

module.exports = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      partner {
        id
        name
        firstName
        lastName
        street
        street2
        city
        state
        {
          id
        }
        country
        {
          id
        }
        email
        phone
      }
    }
  }
`