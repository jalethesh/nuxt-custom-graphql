const gql = require('graphql-tag');

module.exports = gql`
  query ($county: String) {
    towns (county: $county)
  }
`