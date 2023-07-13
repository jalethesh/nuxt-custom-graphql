import { useCart as baseUseCart } from '@vue-storefront/odoo';
import { useVSFContext } from '@vue-storefront/core';
import { ref } from '@nuxtjs/composition-api';

const useCart = () => {
  const context = useVSFContext();

  const { setCart } = baseUseCart();

  const errors = ref({ graphQLErrors: [] });

  const clearCart = async () => {
    try {
      const { data } = await context.$odoo.api.clearCart();
      setCart(data.cart);
    } catch (error) {
      errors.value = error;
    }
  };

  const cartUpdateItem = async (itemId: number, quantity: number) => {
    try {
      const { data } = await context.$odoo.api.updateCartItem({productId: itemId, quantity}); 

      setCart(data.cartUpdateItem);
    } catch (error) {
      error.value = error;
    }
  }

  return {
    clearCart,
    cartUpdateItem,
    errors,
  };
};

export default useCart;
