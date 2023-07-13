import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const useNewArrival = () => {
  // Loads context used to call API endpoint
  const context = useVSFContext();

  // Shared ref holding the response from the API
  const newArrivals = sharedRef(null, `useNewArrival-undefined`);
  const topSellers = sharedRef(null, `useNewArrival-undefined`);
  const featuredProducts = sharedRef(null, `useNewArrival-undefined`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `useNewArrival-loading-undefined`);

  // Shared ref holding errors from the methods
  const error = sharedRef(
    {
      searchNewArrival: null,
    },
    `useNewArrival-error-undefined`
  );

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const searchNewArrival = async (params) => {
    Logger.debug(`useNewArrival/undefined/searchNewArrival`, params);

    try {
      loading.value = true;
      // Change "odoo" to the name of the integration
      const { data } = await context.$odoo.api.getNewArrivals(params);

      newArrivals.value = data.newArrivals;

      error.value.searchNewArrival = null;
    } catch (err) {
      error.value.searchNewArrival = err;
      Logger.error(`useNewArrival/undefined/searchNewArrival`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    searchNewArrival,
    newArrivals: computed(() => newArrivals.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};

export default useNewArrival;
