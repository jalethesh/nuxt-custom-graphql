const odooBaseUrl =
  process.env.BACKEND_BASE_URL ||
  process.env.BASE_URL ||
  'https://odoodev.copia.odoogap.com/';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;

const customQueries1 = require('./copia-api/customQueries');
const apis = require('./copia-api/api');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'copia-extension',
          extendApiMethods: apis,
        },
      ],
      customQueries: customQueries1,
    },
  },
};
