/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const getCountiesQuery = require('./getCountiesQuery');

const getCounties = async (context) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: gql`${getCountiesQuery}`,
  });

  return response;
};

module.exports = getCounties;