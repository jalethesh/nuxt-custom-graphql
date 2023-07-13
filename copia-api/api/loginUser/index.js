/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const logInUserQuery = require('./logInUserQuery');

const logInUser = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${logInUserQuery}`,
  });

  return response;
};

module.exports = logInUser;
