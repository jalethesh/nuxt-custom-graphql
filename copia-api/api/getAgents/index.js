/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const getAgentsQuery = require('./getAgentsQuery');

const getAgents = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${getAgentsQuery}`,
  });

  return response;
};

module.exports = getAgents;