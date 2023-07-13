import { computed, reactive } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import { SetAddressParams } from '~/copia-api/types';

interface CheckoutError {
  setAddress?: string
}

const throwErrors = (errors: Array<{ message?: string }>) => {
  if (errors) {
    throw new Error(errors.map(error => error.message).join(',') || 'Some error');
  }
};

const useCheckout = () => {
  const context = useVSFContext();
  const order = sharedRef(null, `useCheckout-order-undefined`);
  const loading = sharedRef<boolean>(false, `useCheckout-loading-undefined`);
  const isGuest = sharedRef<boolean>(false, `useCheckout-isGuest-undefined`);
  const isDeliverToMe = sharedRef<boolean>(true, `useCheckout-isDeliverToMe-undefined`);
  const error = reactive<CheckoutError>({
    setAddress: null,
  });

  const setAddress = async (params: SetAddressParams) => {
    Logger.debug(`useCheckout/undefined/setAddress`, params);

    console.log('setAddress params:', params);
    try {
      loading.value = true;
      const { data, errors } = await context.$odoo.api.setAddress(params);

      throwErrors(errors);

      order.value = data.setAddress;
      error.setAddress = null;
    } catch (err) {
      error.setAddress = err;
      Logger.error(`useCheckout/undefined/setAddress`, err);
    } finally {
      loading.value = false;
    }
  };
  const toggleToGuest = (): void => {
    isGuest.value = !isGuest.value;
  }
  const setDeliverToMe = (val: boolean): void => {
    isDeliverToMe.value = val;
  }

  return {
    isGuest: computed<boolean>(() => isGuest.value),
    isDeliverToMe: computed<boolean>(() => isDeliverToMe.value),
    toggleToGuest,
    setDeliverToMe,
    setAddress,
    order: computed(() => order.value),
    loading: computed<boolean>(() => loading.value),
    error
  };
};

export default useCheckout;
