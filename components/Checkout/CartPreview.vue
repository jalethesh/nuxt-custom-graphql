<template>
  <div class="highlighted lg:p-14 p-4 pt-6">
    <h3 class="head-text">Totals</h3>
    <div class="space-y-6 mt-10">
      <div class="flex justify-between items-center total">
        <p class="total__name">Products:</p>
        <p class="total__value">{{ totalItems }}</p>
      </div>
      <div class="flex justify-between items-center total">
        <p class="total__name">Subtotal:</p>
        <p class="total__value">KES {{ totals.subtotal.toFixed(2) }}</p>
      </div>
      <div class="flex justify-between items-center total">
        <p class="total__name">Shipping:</p>
        <p class="total__value">Free</p>
      </div>
    </div>

    <hr class="text-white bg-white border-none mt-10" style="height:1px;" />

    <div class="flex justify-between items-center mt-6 mb-10 total">
      <p class="total__value">Total price:</p>
      <p class="total__value">KES 0.00</p>
    </div>

    <div class="promo-code">
      <SfInput
        data-cy="cart-preview-input_promoCode"
        v-model="promoCode"
        name="promoCode"
        class="sf-input--filled"
        placeholder="Enter promo code"
      >
        <template #icon>
          <CopiaButton
            size="small"
            @click="() => applyCoupon({ couponCode: promoCode })"
          >
            {{ $t('Apply') }}
          </CopiaButton>
        </template>
      </SfInput>
    </div>
    <div>
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfButton,
  SfCollectedProduct,
  SfProperty,
  SfCharacteristic,
  SfInput,
  SfCircleIcon
} from '@storefront-ui/vue';
import { computed, ref } from '@vue/composition-api';
import { useCart, checkoutGetters, cartGetters } from '@vue-storefront/odoo';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';

export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfCharacteristic,
    SfInput,
    SfCircleIcon,
    CopiaButton
  },
  setup() {
    const { cart, removeItem, updateItemQty, applyCoupon } = useCart();
    const listIsHidden = ref(false);
    const promoCode = ref('');
    const showPromoCode = ref(false);
    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const shippingMethodPrice = computed(() => checkoutGetters.getShippingMethodPrice(cart.value));

    return {
      shippingMethodPrice,
      discounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      promoCode,
      showPromoCode,
      removeItem,
      updateItemQty,
      checkoutGetters,
      cartGetters,
      applyCoupon,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.head-text {
  font-family: var(--font-family--primary);
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
}

.total {
  &__name {
    font-family: var(--font-family--primary);
    font-style: normal;
    font-weight: 600;
    font-size: var(--font-size--lg);
    line-height: 26px;
    color: var(--_c-copia-secondary-black);
  }

  &__value {
    // font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: var(--font-size--lg);
    line-height: 26px;
    color: var(--_c-copia-primary-black);
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--_c-copia-gray-light-accent);
  // padding: var(--spacer-xl) var(--spacer-xl) 0;
  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}

::v-deep {
  .sf-input {
    &__wrapper {
      background-color: #fff;
      border-radius: 4px;
    }
    & input {
      background-color: #fff;
      color: var(--_c-copia-secondary-black);
      font-family: var(--font-family--primary);
      font-size: var(--font-size--sm);
      font-weight: var(--font-weight--bold);
      padding-left: var(--spacer-sm);
      border-radius: 4px;
      outline: none !important;
    }

    &__error-message {
      display: none;
    }
  }

  .sf-characteristic {
    padding-top: 1.5rem;
    & .sf-icon {
      --icon-color: var(--_c-copia-primary-black);
    }
    &__title {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--bold);
    }
    &__description {
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--bold);
    }
  }
}
</style>
