import { useVSFContext } from '@vue-storefront/core';
import { ref } from '@nuxtjs/composition-api';

const useMyAccount = () => {
  const context = useVSFContext();

  const errors = ref({ graphQLErrors: [] });

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      await context.$odoo.api.updatePassword({ currentPassword, newPassword });

    } catch (error) {
      errors.value = error;
    }
  }

  return {
    updatePassword,
    errors,
  };
};

export default useMyAccount;
