<template>
  <div class="cart-total w-full py-10">
    <div class="w-full cart-total__table">
      <h3>Totals</h3>
      <div class="space-y-6 mt-10">
        <div class="flex justify-between items-center total">
          <h4 class="total__name">Products:</h4>
          <h4 class="total__value">{{ totalItems }}</h4>
        </div>
        <div class="flex justify-between items-center total">
          <h4 class="total__name">Subtotal:</h4>
          <h4 class="total__value">KES {{ totals.subtotal.toFixed(2) }}</h4>
        </div>
        <div class="flex justify-between items-center total">
          <h4 class="total__name">Shipping:</h4>
          <h4 class="total__value">Free</h4>
        </div>
      </div>

      <hr class="text-white bg-white border-none mt-10" style="height: 1px" />

      <div class="flex justify-between items-center mt-6 mb-10 total">
        <h4 class="total__name">Total price:</h4>
        <h4 class="total__value">KES {{ totals.subtotal.toFixed(2) }}</h4>
      </div>
    </div>
    <div class="w-full cart-total__info">
      <nuxt-link to="/checkout/login">
        <CopiaButton v-if="!isEmpty" color="Red">GO TO CHECKOUT</CopiaButton>
      </nuxt-link>
      <div>
        <nuxt-link to="/">
          <CopiaButton color="Black" outline class="mt-8"
            >GO BACK SHOPPING</CopiaButton
          >
        </nuxt-link>
      </div>

      <h6 class="mt-14">Helpful information</h6>

      <ul class="info_list">
        <li>
          Limited FREE delivery to a Copia collection center within 2-4 days.
        </li>
        <li>
          Products heavier than 167kg or longer than 1 meter will be treated as
          home deliver and charged a fee of KSH 500 per order.
        </li>
        <li>
          Our Copia customer care will be in touch to confirm your order and
          exact delivery location.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cartGetters } from '@vue-storefront/odoo';
import { computed } from '@nuxtjs/composition-api';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
export default {
  props: {
    cart: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CopiaButton,
  },
  setup(props) {
    const totalItems = computed(
      () => cartGetters.getTotalItems(props.cart) || 0
    );

    const totals = computed(() => cartGetters.getTotals(props.cart));

    const isEmpty = computed(() =>
      cartGetters.getTotalItems(props.cart) ? false : true
    );

    return {
      totalItems,
      totals,
      isEmpty,
    };
  },
};
</script>

<style lang="scss" scoped>
.cart-total {
  background-color: var(--_c-copia-gray-light-accent);
  &__table {
    padding: 0px 55px;
    h3 {
      font-family: var(--font-family--primary);
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 32px;
    }
  }

  &__info {
    padding: 0 26px;
  }
}

.total {
  &__name {
    font-family: var(--font-family--primary);
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: var(--_c-copia-secondary-black);
  }

  &__value {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: var(--_c-copia-primary-black);
  }
}

.info_list {
  margin-left: 15px;
}
.info_list li {
  list-style: none;
  font-family: var(--font-family--primary);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-top: 20px;
}

.info_list li::before {
  content: '\2022';
  font-weight: bold;
  display: inline-block;
  width: 15px;
  margin-left: -15px;
  color: var(--_c-copia-primary-red);
  font-size: 24px;
}
</style>
