/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const getTownsQuery = require('./getTownsQuery');

const getTowns = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${getTownsQuery}`,
  });

  return response;
};

module.exports = getTowns;