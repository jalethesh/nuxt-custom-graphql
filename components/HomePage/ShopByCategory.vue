<template>
  <div class="shop-by-category">
    <div class="sf-heading">
      <h3 class="sf-heading__title h3 text-left mb-7">Shop by Category</h3>
    </div>
    <ul class="desktop-only">
      <li
        v-for="(category, index) in filteredTopCategories"
        :key="index"
        class="category-details"
      >
        <nuxt-link :to="localePath(`/c/${category.slug}/${category.id}`)">
          <div class="category-wrapper">
            <SfImage
              :src="$image(category.image)"
              alt="catetory"
              class="desktop-category"
              :width="160"
              :height="206"
            />
          </div>
          <p class="category-name">{{ category.name }}</p>
        </nuxt-link>
      </li>
    </ul>
    <SfCarousel
      class="carousel smartphone-only mobile-carousel"
      :settings="{
        peek: 0,
        type: 'slider',
        breakpoints: {
          1025: {
            peek: { before: 0, after: 0 },
            rewind: false,
            perView: 0,
            type: 'slider',
          },
        },
      }"
    >
      <SfCarouselItem
        class="carousel__item"
        v-for="(category, i) in filteredTopCategories"
        :key="i"
      >
        <div class="shop-category">
          <nuxt-link :to="localePath(`/c/${category.slug}/${category.id}`)">
            <div class="flex justify-center items-center">
              <div class="category-wrapper-mobile">
                <SfImage
                  :src="$image(category.image)"
                  alt="catetory"
                  :width="120"
                  :height="120"
                />
              </div>
            </div>
            <p class="category-name">{{ category.name }}</p>
          </nuxt-link>
        </div>
      </SfCarouselItem>
    </SfCarousel>
    <!-- <div class="sf-category-footer text-center desktop-only">
      <button
        class="color-primary sf-button bg-primary-black m-auto see-all"
        :aria-disabled="false"
        :link="null"
        type="button"
      >
        See all Categories
      </button>
    </div> -->
  </div>
</template>

<script>
import {
  SfImage,
  SfLink,
  SfCategoryCard,
  SfCarousel,
} from '@storefront-ui/vue';
import { categoryGetters, useCategory } from '@vue-storefront/odoo';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'ShopByCategory',
  components: {
    SfImage,
    SfLink,
    SfCategoryCard,
    SfCarousel,
  },
  setup(props, { root }) {
    const searchBarRef = ref(null);
    const {
      categories: topCategories,
      load: loadCategory,
      search: searchTopCategoryApi,
    } = useCategory('AppHeader:TopCategories');
    const filteredTopCategories = computed(() =>
      topCategories.value.filter((cat) => cat)
    );
    onSSR(async () => {
      await Promise.all([
        searchTopCategoryApi({
          filter: { parent: true },
          pageSize: 12,
          customQuery: { getCategory: 'copiaTopCategories' },
        }),
      ]);
    });

    return {
      filteredTopCategories,
      addBasePath,
    };
  },
};
</script>

<style lang="scss" scoped>
.shop-category {
  margin-right: 5px;
  margin-left: 5px;
}
.category-wrapper-mobile {
  background-color: #fecb06;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
}

.shop-by-category {
  ul {
    // margin: 0;
    // text-align: center;
    // columns: 4;
    display: flex;
    justify-content: space-between;
    @include for-mobile {
      justify-content: space-around;
    }
    flex-wrap: wrap;
    li {
      // display: inline-block;
      vertical-align: top;
      // width: 200px !important;
      &.category-details {
        //    margin-right: 20px;
        //    margin-bottom: 20px;
      }
    }
  }
}
.category-wrapper {
  background-color: #fecb06;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 295px;
  height: 226px;
}
.category-name {
  color: #1d1f22;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Montserrat';
  text-align: center;
  margin-top: 16px;
  margin-bottom: 24px;
}
.sf-category-card__details {
  text-align: center;
  display: block;
  background: #ffffff;
}
</style>

<style lang="scss">
.shop-by-category {
  @include for-desktop {
    margin-top: 100px;
    .category-details:nth-child(1) .category-wrapper {
      background: hsl(353deg 98% 41%);
    }
  }
  .mobile-carousel {
    @include for-mobile {
      margin-right: -16px !important;
      margin-left: -18px !important;
    }
  }
  .carousel__item:nth-child(1) .category-wrapper-mobile {
    background: hsl(353deg 98% 41%);
  }
  margin-top: var(--spacer-xl);
  .sf-category-card__details {
    text-align: center;
    display: block;
    background: #ffffff;
  }
  .sf-category-card__label {
    color: var(--_c-copia-primary-black);
    font-size: 16px;
    line-height: 24px;
    font-family: 'Montserrat';
  }
  .sf-link.sf-category-card {
    background-color: var(--_c-copia-secondary-yellow) !important;
    margin-bottom: var(--spacer-sm);
  }
  .sf-heading__title.h3 {
    margin-bottom: var(--spacer-sm);
    font-family: 'Montserrat' !important;
    font-weight: 800 !important;
    font-size: 24px !important;
    line-height: 32px !important;
    @include for-mobile {
      font-size: 18px !important;
      font-weight: 700 !important;
    }
  }
  .sf-category-footer {
    margin-top: var(--spacer-sm);
    --c-primary-variant: #434642;
  }
  .see-all {
    border-radius: 8px;
  }
  .desktop-category {
    @include for-desktop {
      width: 70%;
      height: 100%;
      object-fit: cover;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .sf-image{
    width: 100%;
    height: auto;
  }
}
</style>
