<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="main section">
      <SfLoader :class="{ loading }" :loading="loading">
        <div v-if="products.length" class="products">
          <transition-group
            appear
            name="products__slide"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <div
                v-for="(product, i) in products"
                :key="product.id"
                class="w-full flex justify-center"
              >
              <div class="relative">
                <CopiaProductCard
                  data-cy="category-product-card"
                  :product="product"
                  :style="{ '--index': i }"
                  :image-height="326"
                  :image-width="250"
                  :compare="false"
                />
                <SfCircleIcon
                  icon="cross"
                  aria-label="Remove"
                  class="
                    color-danger
                    sf-circle-icon--small
                    sf-product-card__remove-icon
                  "
                  @click.stop="removeFromCompare(product.id)"
                />
              </div>
            </div>
          </transition-group>
        </div>
        <div v-else key="no-results" class="before-results">
          <SfImage
            :width="256"
            :height="176"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <p class="before-results__paragraph">
            {{ $t('Sorry, we didnt find what youre looking for') }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </SfButton>
        </div>
      </SfLoader>
    </div>
    <!-- <div class="mt-8">
      <table class="table-fixed w-full text-center font-bold">
        <tbody>
          <tr class="border-b leading-10">
            <td class="text-left font-normal w-32">Product Code</td>
            <td>KF675</td>
            <td>KF899</td>
            <td>KF123</td>
            <td>KF575</td>
          </tr>
          <tr class="border-b leading-10">
            <td class="text-left font-normal w-32">Material</td>
            <td>Plastic</td>
            <td>Plastic</td>
            <td>Plastic</td>
            <td>Plastic</td>
          </tr>
          <tr class="border-b leading-10">
            <td class="text-left font-normal w-32">Category</td>
            <td>DVD Players</td>
            <td>DVD Players</td>
            <td>DVD Players</td>
            <td>DVD Players</td>
          </tr>
          <tr class="border-b leading-10">
            <td class="text-left font-normal w-32">Country</td>
            <td>Poland</td>
            <td>Poland</td>
            <td>Poland</td>
            <td>Poland</td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <LazyHydrate when-visible>
      <SfCallToAction
        title
        description
        :image="addBasePath('/compare/banner.png')"
        class="mt-12"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <section id="our-promise-footer">
        <h3 class="py-5 lg:py-10">Our Promise</h3>

        <section class="grid lg:grid-cols-4 md:grid-cols-2 gap-4 desktop-only">
          <article
            v-for="(hero, i) in heroes"
            :key="i"
            class="flex bg-light-accent items-center content-arount p-6 space-x-1"
          >
            <img
              :src="addBasePath(hero.img)"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
              style="width: 50px;"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>{{ hero.title }}</h5>
              <span class="text-small">
                {{ hero.text }}
              </span>
            </div>
          </article>
        </section>
        <SfHero class="smartphone-only mb-10">
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-collor-palette.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Unique Everything</h5>
              <span class="text-small">
                We have millions of one-of-a-kind<br />
                items in our shop
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-4"
          >
            <img
              :src="addBasePath('/icons/product-icon-delivery.svg')"
              alt
              id="unique-everything--image"
              class="flex-none"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Free delivery &amp; return</h5>
              <span class="text-small">
                Copia will deliver your goods to your<br />
                nearest delivery point in 2-4 days
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-padlock.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Secure payments</h5>
              <span class="text-small">
                Your information is treated securely.
              </span>
            </div>
          </div>
          <div
            class="flex bg-light-accent items-center lg:px-4 px-8 py-10 space-x-2"
          >
            <img
              :src="addBasePath('/icons/product-icon-chat.svg')"
              alt
              id="unique-everything--image"
              class="flex-none pr-2"
            />
            <div class="flex-1 w-3/4 h-full">
              <h5>Customer support</h5>
              <p class="text-small">
                We are here to assist you. If you need<br />
                help call 0709 339 000
              </p>
            </div>
          </div>
        </SfHero>
      </section>
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfProductCard,
  SfBreadcrumbs,
  SfButton,
  SfIcon,
  SfCircleIcon,
  SfQuantitySelector,
  SfCallToAction,
  SfHero,
  SfImage,
  SfLoader,
} from "@storefront-ui/vue";
import {
  productGetters,
} from '@vue-storefront/odoo';
import { addBasePath } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { computed, ref, defineComponent, useStore } from '@nuxtjs/composition-api';
import { useCompareProducts } from '~/composables';
import CopiaProductCard from '~/components/Core/Organisms/CopiaProductCard.vue';

export default defineComponent({
  name: "Compare",

  components: {
    SfProductCard,
    SfBreadcrumbs,
    SfButton,
    SfIcon,
    SfCircleIcon,
    SfQuantitySelector,
    SfCallToAction,
    SfHero,
    SfImage,
    SfLoader,
    LazyHydrate,
    CopiaProductCard,
  },

  setup() {
    const { state } = useStore();
    const { loading, getProducts, removeFromCompare } = useCompareProducts();

    const products = computed(() => state.compare.products);

    if (products.value.length === 0) {
      getProducts()
    }

    const heroes = ref([
      {
        img: '/icons/product-icon-collor-palette.svg',
        title: 'Unique Everything',
        text: 'We have millions of one-of-a-kind items in our shop',
      },
      {
        img: '/icons/product-icon-delivery.svg',
        title: 'Free delivery & return',
        text: 'Copia will deliver your goods to your nearest delivery point in 2-4 days',
      },
      {
        img: '/icons/product-icon-padlock.svg',
        title: 'Secure payments',
        text: 'Your information is treated securely.',
      },
      {
        img: '/icons/product-icon-chat.svg',
        title: 'Customer support',
        text: 'We are here to assist you. If you need help call 0709 339 000',
      },
    ]);

    const breadcrumbs = ref([
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Compare Product",
        link: "#",
      },
    ]);

    return {
      loading,
      heroes,
      products,
      breadcrumbs,
      productGetters,
      addBasePath,
      removeFromCompare,
    }
  }
});
</script>

<style lang="scss" scoped>
  @import "~@storefront-ui/vue/styles";
  #category {
    box-sizing: border-box;
    @include for-desktop {
      max-width: 1240px;
      margin: 0 auto;
    }
  }
  .sf-product-card {
    &__compare-icon {
      position: absolute;
      top: 4rem;
      right: 2.4rem;
      opacity: var(--product-card-compare-icon-opacity, 0);
    }
    &__remove-icon {
      position: absolute;
      top: 0;
      right: -0.9rem;
      z-index: 1;
    }
    &:hover {
      --product-card-compare-icon-opacity: 1;
    }
    
  }
  .main {
    &.section {
      padding: var(--spacer-xs);
      @include for-desktop {
        padding: 0;
      }
    }
  }
  .breadcrumbs {
    padding: var(--spacer-base) var(--spacer-base) var(--spacer-base) var(--spacer-sm);
    a {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--semibold);
      &.current {
        color: var(--_c-copia-primary-red);
      }
    }
    ::v-deep {
      .sf-breadcrumbs__list-item:not(:last-child)::after {
        content: url(/icons/breadcrumb-arrow-right.svg);
      }
    }
  }
  .sf-quantity-selector {
    button {
      padding-top: 0px;
    }
  }
  .sf-hero {
    img {
      width: 50px;
    }
  }
  .before-results {
    box-sizing: border-box;
    padding: var(--spacer-lg) var(--spacer-sm) var(--spacer-2xl);
    width: 100%;
    text-align: center;
    @include for-desktop {
      padding: 0;
    }
    &__picture {
      --image-width: 230px;
      margin-top: var(--spacer-2xl);
      @include for-desktop {
        --image-width: 18.75rem;
        margin-top: var(--spacer-base);
      }
    }
    &__paragraph {
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      color: var(--c-text-muted);
      margin: 0;
      @include for-desktop {
        font-size: var(--font-size--lg);
      }
      &:first-of-type {
        margin: var(--spacer-xl) auto var(--spacer-xs);
      }
    }
    &__button {
      margin: var(--spacer-xl) auto;
      width: 100%;
    }
  }
</style>