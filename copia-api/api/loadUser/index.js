/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const loadUserQuery = require('./loadUserQuery');

const loadUser = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${loadUserQuery}`,
  });

  return response;
};

module.exports = loadUser;
