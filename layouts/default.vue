<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
      <TheCompareModal v-if="productCompareBar" class="desktop-only" />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import { 
  defineComponent,
  useRoute,
  ref,
  watch,
} from '@nuxtjs/composition-api';

import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
import TheCompareModal from '~/components/TheCompareModal.vue';

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
    TheCompareModal,
  },

  setup() {
    const route = useRoute();

    const productCompareBar = ref(true);
    const hideVisibility = () => {
      if (
        route.value.path === '/compare/' ||
        route.value.path === '/compare' ||
        route.value.path === '/checkout/shipping' ||
        route.value.path === '/checkout/shipping/'
      ) {
        productCompareBar.value = false;
      } else {
        productCompareBar.value = true;
      }
    };
    hideVisibility()
    
    watch(() => route.value.path, hideVisibility);

    return {
      productCompareBar,
    };
  },
});
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';
</style>
