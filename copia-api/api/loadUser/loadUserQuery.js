const gql = require('graphql-tag');

module.exports = gql`
  query {
    partner{
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
`