<template>
  <!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem
        :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
        class="bottom-naviationitem"
        icon="store"
        size="24px"
        iconSize="24px"
        label="Home"
        @click="isMobileMenuOpen ? toggleMobileMenu() : false"
      />
    </nuxt-link>
    <SfBottomNavigationItem
      size="24px"
      iconSize="24px"
      label="Menu"
      @click="toggleMobileMenu"
      class="bottom-naviationitem pb-0 pt-1.5"
      :class="isMobileMenuOpen ? 'bottome-navigation-active bottom-navigation-menu-active' : ''"
    >
      <template #icon>
        <SfIcon
          icon="menu"
          :color="isMobileMenuOpen ? '#E81E2B' : '#000000'"
          size="25px"
          class="-mt-4 mb-2"
        />
      </template>
    </SfBottomNavigationItem>
    <SfBottomNavigationItem
      icon="heart"
      size="22px"
      iconSize="22px"
      label="Favorites"
      @click="toggleWishlistSidebar"
      class="bottom-naviationitem"
    />
    <SfBottomNavigationItem
      :icon="(isAuthenticated && !isWelcomeToCopia)? 'profile_fill' :'account'"
      size="20px"
      iconSize="19px"
      label="Profile"
      @click="handleAccountClick"
      class="bottom-naviationitem"
    />
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <!-- @click="toggleCartSidebar" -->
    <SfBottomNavigationItem
      label="Cart"
      icon="empty_cart"
      @click="toggleCartSidebar"
      class="bottom-naviationitem"
    >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="empty_cart"
            color="white"
            size="25px"
            :style="{ margin: '0 0 0 -2px' }"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/odoo';
import { addBasePath } from "@vue-storefront/core";

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
  },
  setup(props, { root }) {
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
      toggleMobileMenu,
      isMobileMenuOpen,
      isWelcomeToCopia
    } = useUiState();
    const { isAuthenticated } = useUser();
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };

    return {
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      handleAccountClick,
      isAuthenticated,
      isWelcomeToCopia
    };
  },
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
::v-deep .sf-bottom-navigation-item__label {
  font-family: Lato;
  font-weight: 900;
  color: var(--_c-copia-primary-black);
}
</style>
<style lang="scss">
.navigation-bottom {
  padding: 10px 10px 0 30px;
  height: 68px;
  .bottom-naviationitem {
    color: #1d1f22;
    font-weight: 900;
    font-size: 12px;
    line-height: 18px;
    font-family: 'Lato';
    width: 64px;
    &:nth-child(4) {
      .sf-bottom-navigation-item__icon {
        padding-bottom: 2px;
      }
    }
  }
  .bottome-navigation-active {
    color: #e81e2b;
  }
  .bottom-navigation-menu-active{
    .sf-bottom-navigation-item__label{
      color: #E81E2B;
    }
  }
  .sf-circle-icon {
    background: #e81e2b;
  }
}
</style>
