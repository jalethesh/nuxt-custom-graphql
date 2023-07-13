/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');

const getMegaMenu = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`
      query {
        websiteMenu 
      }
    `,
  });

  return response;
};

module.exports = getMegaMenu;
