import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const useFeaturedProducts = () => {
  // Loads context used to call API endpoint
  const context = useVSFContext();

  // Shared ref holding the response from the API
  const featuredProducts = sharedRef(null, `useFeaturedProducts-undefined`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `useFeaturedProducts-loading-undefined`);

  // Shared ref holding errors from the methods
  const error = sharedRef(
    {
      searchFeaturedProduct: null,
    },
    `useFeaturedProducts-error-undefined`
  );

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const searchFeaturedProduct = async (params) => {
    Logger.debug(`useFeaturedProducts/undefined/searchFeaturedProduct`, params);

    try {
      loading.value = true;
      // Change "odoo" to the name of the integration
      const { data } = await context.$odoo.api.getFeaturedProducts(params);

      featuredProducts.value = data.featuredProducts;

      error.value.searchFeaturedProduct = null;
    } catch (err) {
      error.value.searchFeaturedProduct = err;
      Logger.error(`useFeaturedProduct/undefined/searchFeaturedProduct`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    searchFeaturedProduct,
    featuredProducts: computed(() => featuredProducts.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};

export default useFeaturedProducts;
