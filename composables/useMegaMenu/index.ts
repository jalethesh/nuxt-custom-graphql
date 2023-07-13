import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

const useMegaMenu = () => {
  // Loads context used to call API endpoint
  const context = useVSFContext();

  // Shared ref holding the response from the API
  const megaMenu = sharedRef(null, `useMegaMenu-undefined`);

  // Shared ref indicating whether any method is waiting for the data from the API
  const loading = sharedRef(false, `useMegaMenu-loading-undefined`);

  // Shared ref holding errors from the methods
  const error = sharedRef(
    {
      searchMegaMenu: null,
    },
    `useMegaMenu-error-undefined`
  );

  // Method to call an API endpoint and update `result`, `loading` and `error` properties
  const searchMegaMenu = async (params) => {
    Logger.debug(`useMegaMenu/undefined/searchMegaMenu`, params);

    try {
      loading.value = true;
      // Change "odoo" to the name of the integration
      const { data } = await context.$odoo.api.getMegaMenu(params);

      megaMenu.value = data?.websiteMenu;

      error.value.searchMegaMenu = null;
    } catch (err) {
      error.value.searchMegaMenu = err;
      Logger.error(`useMegaMenu/undefined/searchMegaMenu`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    searchMegaMenu,
    megaMenu: computed(() => megaMenu.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};

export default useMegaMenu;
