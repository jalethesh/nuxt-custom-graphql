/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const getVillagesQuery = require('./getVillagesQuery');

const getVillages = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${getVillagesQuery}`,
  });

  return response;
};

module.exports = getVillages;