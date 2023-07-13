<template>
  <div class="mobile-menu">
    <SfSidebar
      :visible="isMobileMenuOpen"
      :button="false"
      class="sidebar sf-sidebar--right smartphone-only"
    >
      <SfMegaMenu title="Main Categories" visible :class="'main-title'">
        <SfMegaMenuColumn v-for="(megaMenu, i)  in megaMenuData" :key="i" :title="megaMenu.name">
          <SfAccordion open="" :multiple="false" transition="" showChevron>
            <SfAccordionItem  v-for="(megaMenuChild, j)  in megaMenu.child" :key="j"  :header="megaMenuChild.name">
              <SfList>
                <SfListItem v-for="(menuitem, k)  in megaMenuChild.child" :key="k">
                  <div @click="toggleMobileMenu">
                    <SfMenuItem :label="menuitem.name" :link="localePath(`${menuitem.url}`)" />
                  </div>
                </SfListItem>
              </SfList>
            </SfAccordionItem>
            <div class="menu-banner" v-if="!!megaMenu.image">
              <SfBanner
                :title="''"
                :subtitle="''"
                :description="''"
                :button-text="'LEARN MORE'"
                :link="localePath(`${megaMenu.url}`)"
                :image="$image(megaMenu.image)"
                :class="'mobile-menu-banner'"
              />
              <div @click="toggleMobileMenu">
                <SfButton class="learn-more"  :link="localePath(`${megaMenu.url}`)"> learn more </SfButton>
              </div>
            </div>
          </SfAccordion>
        </SfMegaMenuColumn>
        <!-- <SfMegaMenuColumn title="Foodstuff & Household">
          <SfAccordion open="" :multiple="false" transition="" showChevron>
            <SfAccordionItem header="Fashion">
              <SfList>
                <SfListItem><SfMenuItem label="Skirts " /></SfListItem>
                <SfListItem><SfMenuItem label="Sweaters" /></SfListItem>
                <SfListItem><SfMenuItem label="Dresses" /></SfListItem>
                <SfListItem><SfMenuItem label="Pants" /></SfListItem>
                <SfListItem><SfMenuItem label="Underwear" /></SfListItem>
              </SfList>
            </SfAccordionItem>
            <SfAccordionItem header="BEAUTY">
              <SfList>
                <SfListItem><SfMenuItem label="Flat shoes " /></SfListItem>
                <SfListItem><SfMenuItem label="Face Care" /></SfListItem>
                <SfListItem><SfMenuItem label="Braids" /></SfListItem>
                <SfListItem><SfMenuItem label="Lotions and Oils" /></SfListItem>
                <SfListItem><SfMenuItem label="Weaves" /></SfListItem>
              </SfList>
            </SfAccordionItem>
          </SfAccordion>
        </SfMegaMenuColumn> -->
        <div class="link-mega">
          <img :src="'/icons/mega-location.svg'" />
          <p>Where we deliver</p>
        </div>
        <div class="link-mega">
          <img :src="'/icons/mega-question.svg'" />
          <p>How Copia works</p>
        </div>
        <div class="link-mega">
          <img :src="'/icons/mega-login.svg'" />
          <p>Log In</p>
        </div>
      </SfMegaMenu>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfMegaMenu,
  SfList,
  SfMenuItem,
  SfAccordion,
  SfSearchBar,
  SfIcon,
  SfBanner,
  SfButton,
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';

import {
  useMegaMenu,
} from '../composables';
import { useUiState } from '~/composables';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'MobileMenu',
  components: {
    SfSidebar,
    SfMegaMenu,
    SfList,
    SfMenuItem,
    SfAccordion,
    SfSearchBar,
    SfIcon,
    SfBanner,
    SfButton,
  },
  setup(props, { root }) {
    const { toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const {
      megaMenu,
      error: errorMegaMenu,
      loading: loadingMegaMenu,
      searchMegaMenu,
    } = useMegaMenu();
    const megaMenuData = computed(() => megaMenu?.value?.websiteMenu);

    onSSR(async () => {
      await Promise.all([
        searchMegaMenu(),
      ]);
    });
    return {
      isMobileMenuOpen,
      megaMenuData,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss">
.mobile-menu {
  .sf-sidebar__aside {
    padding-bottom: 70px;
    & > .sf-bar {
      display: none;
    }
  }
  .sf-sidebar__content {
    padding: 0;
  }
  .sf-mega-menu {
    .sf-mega-menu__bar {
      background: white;
      justify-content: flex-start;
      padding: 0;
      margin-top: 30px;
      margin-bottom: 30px;

      .sf-bar__icon {
        .sf-icon-path {
          display: none;
        }
      }
    }
    .sf-bar__title {
      color: #1d1f22;
      font-family: 'Montserrat';
      font-size: 24px;
      font-weight: 700;
      line-height: 30px;
    }
  }
  .is-active {
    .sf-mega-menu__bar {
      background: #f1f2f3;
      justify-content: space-between;
      padding: 0 24px;
      margin: 0;
      .sf-bar__icon {
        .sf-icon-path {
          display: block;
        }
      }
      .sf-bar__title {
        color: #43464e;
        font-family: 'Montserrat';
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
      }
    }
  }
  .sf-menu-item {
    .sf-menu-item__label {
      font-size: 16px;
      font-weight: 700;
      font-family: 'Montserrat';
      line-height: 22px;
      color: #43464e;
    }
  }
  .sf-accordion-item {
    .sf-accordion-item__header {
      color: #43464e;
      font-size: 16px;
      line-height: 22px;
      color: #43464e;
      font-weight: 700;
      font-family: 'Montserrat';
    }
    .is-open {
      color: #e81e2b;
    }
  }
  .sf-mega-menu-column__content {
    .sf-accordion-item__content {
      padding: 0;
      .sf-menu-item__label {
        font-family: 'Montserrat';
        font-weight: 500;
        line-height: 22px;
        font-size: 16px;
        color: #43464e;
      }
      .sf-menu-item__mobile-nav-icon {
        display: none !important;
      }
    }
  }
  .link-mega {
    display: flex;
    align-items: center;
    padding: 20px 16px;
    border-bottom: 1px solid #f1f2f3;
    width: 100%;
    p {
      font-family: 'Montserrat';
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #43464e;
      margin-left: 16px;
    }
  }
  .menu-banner {
    display: flex;
    justify-content: center;
    padding: 16px 16px 0;
    position: relative;
    .mobile-menu-banner {
      background-size: cover;
    }
    .learn-more {
      position: absolute;
      font-family: 'Lato';
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      background: #1d1f22;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 700;
      --c-link-hover:white;

    }
    .sf-banner__call-to-action {
      display: none;
    }
  }
  .is-open {
    .sf-chevron__bar:after {
      background: #e81e2b !important;
    }
  }
}
</style>
