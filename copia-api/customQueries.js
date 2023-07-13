const gql = require('graphql-tag');
const orderFragment = require('./fragments/orderFragment.ts');

module.exports = {
  copiaGetProductList: ({ variables }) => ({
    query: gql `
    query(
      $filter: ProductFilterInput
      $currentPage: Int
      $pageSize: Int = 0
      $search: String
      $sort: ProductSortInput
    ){
      products(
        filter: $filter
        currentPage: $currentPage
        pageSize: $pageSize
        search: $search
        sort: $sort
      ){
        totalCount
        attributeValues {
          id
          name
          htmlColor
          search
          priceExtra
          attribute {
            id
            name
            type
          }
          displayType
        }
        products {
          id
          name
          image
          isInWishlist
          description
          firstVariant
          price
          sku
          slug
          combinationInfo
          attributeValues {
            id
            name
            htmlColor
            search
            priceExtra
            attribute {
              id
              name
              type
            }
            displayType
          }
        }
      }
    }
    `,
    variables
  }),

  copiaCategoryList: ({ variables }) => ({
    query: gql`
      query(
        $filter: CategoryFilterInput
        $currentPage: Int
        $pageSize: Int
        $search: String
        $sort: CategorySortInput
      ){
        categories(
          filter: $filter
          currentPage: $currentPage
          pageSize: $pageSize
          search: $search
          sort: $sort
        )
        {
          categories {
            id
            name
            slug
            bannerImage
            parent {
              id
              name
              slug
              bannerImage
              parent {
                id
                name
                slug
                bannerImage
                childs {
                  id
                  name
                  slug
                  bannerImage
                  childs {
                    id
                    name
                    slug
                    bannerImage
                  }
                }
              }
              childs {
                id
                name
                slug
                bannerImage
                childs {
                  id
                  name
                  slug
                  bannerImage
                }
              }
            }
            childs {
              id
              name
              slug
              bannerImage
              childs {
                id
                name
                slug
                bannerImage
              }
            }
          }
        }
      }
    `,
    variables
  }),

  copiaCartLoad: ({ variables }) => ({
    variables,
    query: gql`
      query {
        cart {
          ${orderFragment}
        }
      }
    `
  }),

  copiaCartRemoveItem: ({ variables }) => ({
      variables,
      mutation: gql`
        mutation($lineId: Int!) {
          cartRemoveItem(productId: $lineId) {
            ${orderFragment}
          }
        }
      `
  }),
  copiaCartAddItem: ({variables}) => ({
    variables,
    mutation: gql`
      mutation($productId: Int!, $quantity: Int!) {
        cartAddItem(productId: $productId, quantity: $quantity) {
          ${orderFragment}
        }
      }
    `
  }),

  copiaCartAddMultipleItems: ({ variables }) => ({
    variables,
    mutation: gql`
      mutation
    `
  }),

  copiaCartUpdateItemQty: ({ variables }) => ({
    variables,
    mutation: gql`
    mutation($lineId: Int!, $quantity: Int!) {
      cartUpdateItem(productId: $lineId, quantity: $quantity) {
        ${orderFragment}
      }
    }
    `
  }),

  copiaWishListLoad: ({ variables }) => ({
    variables,
    query: gql`
      query {
        wishlistItems{
          wishlistItems {
            id
            product {
              id
              name
              image
              description
              smallImage
              displayName
              slug
              status
              price
              combinationInfo
              sku
              qty
            }
          }
        }
      }
    `
  }),

  copiaWishlistAddItem: ({ variables }) => ({
    variables,
    mutation: gql`
      mutation($productId: Int!) {
        wishlistAddItem(productId: $productId) {
          wishlistItems {
            id
            product {
              id
              name
              image
              description
              smallImage
              displayName
              slug
              status
              price
              combinationInfo
              sku
              qty
            }
          }
        }
      }
    `
  }),

  copiaWishlistRemoveItem : ({ variables }) => ({
    variables,
    mutation: gql`
      mutation($wishId: Int!) {
        wishlistRemoveItem(wishId: $wishId) {
          wishlistItems {
            id
            product {
              id
              name
              image
              description
              smallImage
              displayName
              slug
              status
              price
              combinationInfo
              sku
              qty
            }
          }
        }
      }
    `
  }),

  copiaTopCategories: ({ variables }) => ({
    variables,
    query: `
      query categories(
        $search: String
        $filter: CategoryFilterInput
        $currentPage: Int
        $pageSize: Int
        $sort: CategorySortInput
      ) {
        categories(
          search: $search
          filter: $filter
          currentPage: $currentPage
          pageSize: $pageSize
          sort: $sort
        ) {
          categories {
            id
            name
            image
            slug
            bannerImage
            childs {
              name
              id
              image
              slug
              parent {
                id
                name
                slug
                bannerImage
              }
            }
          }
        }
      }
    `,
  }),
  productsNewArrival: ({ variables }) => ({
    variables,
    query: `
      query products(
        $filter: ProductFilterInput
        $currentPage: Int
        $pageSize: Int
        $search: String
        $sort: ProductSortInput
      ) {
        products(
          filter: $filter
          currentPage: $currentPage
          pageSize: $pageSize
          search: $search
          sort: $sort
        ) {
          products {
            name
            image
            sku
            price
            slug
            metaTitle
            websitePrice
            websitePublicPrice
            websitePriceDifference
          }
        }
      }
    `,
  }),
  getProduct: ({ variables }) => ({
    variables,
    query: `
    query product(
      $id: Int
    ) {
      product(
        id: $id
      ) {
        id
        firstVariant
        name
        visibility
        image
        smallImage
        thumbnail
        sku
        price
        slug
        qty
        combinationInfo
        categories {
          id
          name
          slug
          parent{
            id
          }
        }
        alternativeProducts {
          id
          firstVariant
          name
          image
          sku
          price
          slug
          combinationInfo
        }
        attributeValues {
          id
          name
          displayType
          priceExtra
          attribute {
            id
            name
          }
          search
        }
        productVariants {
          id
          name
          qty
        }
        metaTitle
        websitePrice
        websitePublicPrice
        websitePriceDifference
      }
    }`,
  }),

  getProductsList: ({ query, variables, metadata }) => {
    variables.filters = metadata.filters;

    return {
      query: `
        query products(
          $filters: ProductFilterInput
        ) {
          products(
            filter: $filters
          ) {
            products {
              id
              firstVariant
              name
              image
              sku
              price
              slug
              qty
              combinationInfo
              metaTitle
              websitePrice
              websitePublicPrice
              websitePriceDifference
              combinationInfo
            }
          }
        }
      `,
      variables
    }
  },

  getProductVariant: ({ variables }) => ({
    variables,
    query: `
      query($productTemplateId: Int, $combinationId: [Int]) {
        productVariant(
          productTemplateId: $productTemplateId
          combinationId: $combinationId
        ) {
          product {
            id
            image
            qty
            variantPrice
            variantPriceAfterDiscount
            variantHasDiscountedPrice
          }
          productTemplateId
          displayName
          price
          listPrice
          hasDiscountedPrice
        }
      }
    `
  }),

  customSignUpUserMutation:({ variables }) => ({
    variables,
    mutation: gql`
      mutation register($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        register(email: $email, firstName: $firstName,  lastName: $lastName, password: $password) {
          partner{
            id
            name
            street
            street2
            city
            state
            {
              id
            }
            country
            {
              id
            }
            email
            phone
          }
        }
      }
    `
  }),
};
