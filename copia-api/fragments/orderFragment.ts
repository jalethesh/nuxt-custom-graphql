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

const query = `
  order {
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
    customerId {
      id
      firstName
      lastName
      phone
      email
    }
    remoteCustomerId {
      id
      firstName
      lastName
      phone
      email
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
`;

module.exports = query;
