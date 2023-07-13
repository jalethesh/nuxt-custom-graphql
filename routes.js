const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [
    {
      name: 'home',
      path: '/',
      component: path.resolve(themeDir, 'pages/Home.vue'),
    },
    {
      name: 'product',
      path: '/p/:id/:slug/',
      component: path.resolve(themeDir, 'pages/Product.vue'),
    },
    {
      name: 'productPage',
      path: '/product-page',
      component: path.resolve(themeDir, 'pages/ProductPage.vue'),
    },
    {
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: path.resolve(themeDir, 'pages/Category.vue'),
    },
    {
      name: 'cart',
      path: '/cart',
      component: path.resolve(themeDir, 'pages/Cart.vue'),
    },
    {
      name: 'myAccount',
      path: '/my-account',
      component: path.resolve(themeDir, 'pages/MyAccount/MyAccount.vue'),
    },
    {
      name: 'resetPassword',
      path: '/forgot-password/new-password',
      component: path.resolve(themeDir, 'pages/ResetPassword.vue'),
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: path.resolve(themeDir, 'pages/Checkout.vue'),
      children: [
        {
          path: 'login',
          name: 'checkout-login',
          component: path.resolve(themeDir, 'pages/Checkout/Login.vue'),
        },
        {
          path: 'guest',
          name: 'checkout-guest',
          component: path.resolve(themeDir, 'pages/Checkout/Guest.vue'),
        },
        {
          path: 'delivery',
          name: 'delivery',
          component: path.resolve(themeDir, 'pages/Checkout/Delivery.vue'),
        },
        {
          path: 'payment',
          name: 'payment',
          component: path.resolve(themeDir, 'pages/Checkout/Payment.vue'),
        },
        {
          path: 'thank-you',
          name: 'thank-you',
          component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue'),
        },
      ],
    },
  ];
}
