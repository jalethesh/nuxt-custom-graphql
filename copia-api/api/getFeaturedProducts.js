/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');

const getFeaturedProducts = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    variables: params,
    query: gql`
      query {
        featuredProducts {
          name
          image
          id
          sku
          price
          slug
          firstVariant
          websitePrice
          websitePublicPrice
          websitePriceDifference
          combinationInfo
        }
      }
    `,
  });

  return response;
};

module.exports = getFeaturedProducts;
