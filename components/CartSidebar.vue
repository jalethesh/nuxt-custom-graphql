<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition type="transition" name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="collected-product-list">
            <transition-group name="sf-fade" type="transition" tag="div">
              <CopiaCollectedProduct  
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </transition-group>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              :width="256"
              :height="176"
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.svg"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade" type="transition">
          <div v-if="totalItems">
            <SfProperty
              name="Total price"
              class="sf-property sf-property--large my-cart__total-price flex items-center mb-8"
            >
              <template #value>
                <SfPrice :regular="$n(totals.subtotal, 'currency')" />
              </template>
            </SfProperty>
            <div class="flex space-x-3">
              <nuxt-link to="/checkout/login">
                <CopiaButton color="Red" @click="toggleCartSidebar">{{
                  $t('Go to checkout')
                }}</CopiaButton>
              </nuxt-link>
              <nuxt-link to="/cart">
                <CopiaButton color="Black" outline @click="toggleCartSidebar"
                  >See Details</CopiaButton
                >
              </nuxt-link>
            </div>
          </div>
          <div v-else>
            <CopiaButton
              class="sf-button"
              color="Yellow"
              @click="toggleCartSidebar"
              >{{ $t('Go back shopping') }}</CopiaButton
            >
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
} from '@storefront-ui/vue';
import CopiaCollectedProduct from './Core/Organisms/CopiaCollectedProduct.vue';
import { computed } from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, cartGetters } from '~/composables';
import CopiaButton from '~/components/Core/Atoms/CopiaButton.vue';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    CopiaButton,
    CopiaCollectedProduct
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartSidebar.scss';
</style>
