const gql = require('graphql-tag');

const coreProductAttribs = `
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
`;

const clearCart = async (context) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    mutation: gql`
      mutation{
        cartClear{
            id
            name
            amountTotal
            amountTax
            amountDelivery
            dateOrder
            orderUrl
            stage
            websiteOrderLine {
                id
                name
                product {
                    ${coreProductAttribs}
                }
                quantity
                priceTotal
            }
            orderLines {
              id
              name
              product {
                ${coreProductAttribs}
              }
              quantity
              priceTotal
            }
            partnerInvoice {
                id
                name
                street
                phone
                country {
                  id
                }
                city
                phone
                zip
              }
              partnerShipping {
                id
                name
                street
                city
                phone
                zip
                country {
                  id
                }
              }
              shippingMethod{
                id
                name
                price
              }
        }
      }`
  });

  return response;
};

module.exports = clearCart;
