const gql = require('graphql-tag');

module.exports = gql`
  query ($town: Int) {
    villages (town: $town)
  }
`