/* eslint-disable @typescript-eslint/no-unused-vars */
const gql = require('graphql-tag');

const getWishlist = async (context) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    fetchPolicy: 'no-cache',
    query: gql`
      query {
        wishlistItems {
            wishlistItems {
                id
                product{ 
                    id
                    name
                    image
                    description
                    smallImage
                    displayName
                    slug
                    status
                    price
                    combinationInfo,
                    sku
                    qty
                    firstVariant
                }
            }
        }
      }
    `,
  });

  return response;
};

module.exports = getWishlist;