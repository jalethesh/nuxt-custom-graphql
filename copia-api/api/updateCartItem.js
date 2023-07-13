const gql = require('graphql-tag');
const orderFragment = require('../fragments/orderFragment.ts');

const updateCartItem = async (context, params) => {
    const apolloClient = context.client.apollo;
    const response = await apolloClient.mutate({
      variables: params,
      mutation: gql`
        mutation($productId: Int!, $quantity: Int!){
            cartUpdateItem(productId: $productId, quantity: $quantity) {
                ${orderFragment}
            }
        }`,
    });

    return response;
}

module.exports = updateCartItem;