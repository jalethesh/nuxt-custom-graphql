
<template>
  <SfTabs
    :openTab="1"
    tabShowText="show"
    tabHideText="hide"
  >
    <SfTab title="New Arrivals">
      <SfCarousel
        class="carousel"
        :settings="{ peek: 16, breakpoints: { 1025: { peek: 0, perView: 2 } } }"
      >
        <template #prev="{ go }">
          <SfArrow
            aria-label="prev"
            class="sf-arrow--left rounded-full"
            @click="go('prev')"
          />
        </template>

        <template #next="{ go }">
          <SfArrow
            aria-label="next"
            class="sf-arrow--right rounded-full"
            @click="go('next')"
          />
        </template>

        <SfCarouselItem
          class="carousel__item"
          v-for="(product, i) in products"
          :key="i"
        >
          <SfProductCard
            :title="product.title"
            :image="product.image"
            :imageWidth="216"
            :imageHeight="288"
            :nuxtImgConfig="{ fit: 'cover' }"
            image-tag="nuxt-img"
            :regular-price="product.price.regular"
            :max-rating="product.rating.max"
            :score-rating="product.rating.score"
            :show-add-to-cart-button="true"
            :is-on-wishlist="product.isInWishlist"
            :link="localePath({ name: 'home' })"
            class="carousel__item__product"
            @click:wishlist="toggleWishlist(i)"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfTab>
    <SfTab title="Top sellers">
      The Larissa V-Neck Tee features a semi-fitted shape that's flattering for
      every figure. You can hit the gym with confidence while it hugs curves and
      hides common 'problem' areas. Find stunning women's cocktail dresses and
      party dresses.
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfIcon, SfTabs, SfCarousel } from '@storefront-ui/vue';

export default {
  name: 'HighlightProducts',
  components: {
    SfIcon,
    SfTabs, SfCarousel
  },
  setup() {
    

    return {
      
    };
  }
};
</script>
<style lang="scss" scoped>
.order-process-flow {
    ul {
        li {
            border: 1px solid #E0E0E1;
            box-sizing: border-box;
            padding: 25px 40px;
            p.icon {
                background: #FECB06;
                width: 64px;
                height: 64px;
                border-radius: 60%;
                margin-right: 16px;
                span {
                    top: calc(50% - 13px);
                }
                svg {
                    fill: #FD0019;
                }
            }
            p.description {
                width: calc(100% - 64px);
            }
        }
    }
}
</style>