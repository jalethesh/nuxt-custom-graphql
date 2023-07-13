/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');
const setAddressQuery = require('./setAddressQuery');

const setAddress = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`${setAddressQuery}`,
  });

  return response;
};

module.exports = setAddress;
