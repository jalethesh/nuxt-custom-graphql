import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const useTopSeller = () => {
  // Loads context used to call API endpoint
  const context = useVSFContext();

  // Shared ref holding the response from the API
  const topSellers = sharedRef(null, `useTopSeller-undefined`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `useTopSeller-loading-undefined`);

  // Shared ref holding errors from the methods
  const error = sharedRef(
    {
      searchTopSeller: null,
    },
    `useTopSeller-error-undefined`
  );

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const searchTopSeller = async (params) => {
    Logger.debug(`useTopSeller/undefined/searchTopSeller`, params);

    try {
      loading.value = true;
      // Change "odoo" to the name of the integration
      const { data } = await context.$odoo.api.getTopSellers(params);

      topSellers.value = data.topSellers;

      error.value.searchTopSeller = null;
    } catch (err) {
      error.value.searchTopSeller = err;
      Logger.error(`useTopSeller/undefined/searchTopSeller`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    searchTopSeller,
    topSellers: computed(() => topSellers.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};

export default useTopSeller;
