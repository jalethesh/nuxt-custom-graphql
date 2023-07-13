<template>
  <section class="small-banner lg:w-96 w-full">
    <div class="small-banner__wrapper" :link="link">
      <slot name="subtitle" v-bind="{ subtitle }">
        <span
          :class="{ 'display-none': !subtitle }"
          class="small-banner__subtitle text-sm py-4"
        >
          {{ subtitle }}
        </span>
      </slot>
      <slot name="title" v-bind="{ title }">
        <span :class="{ 'display-none': !title }" class="small-banner__title text-4xl">
          {{ title }}
        </span>
      </slot>
      <div class="flex flex-col items-center">
        <slot name="image" v-bind="{ image }">
          <SfImage
            :src="addBasePath(image)"
            :width="180"
            :height="130"
            alt="Offer"
            class="py-4"
          />
        </slot>
        <slot name="call-to-action" v-bind="{ buttonText }">
          <SfButton
            v-if="buttonText"
            :link="link"
            class="small-banner__call-to-action color-secondary"
            data-testid="banner-cta-button"
            @click.prevent="$emit('click')"
          >
            {{ buttonText }}
          </SfButton>
        </slot>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import {
    defineComponent
  } from '@vue/composition-api'
  import { SfButton, SfImage } from '@storefront-ui/vue';
  import { addBasePath } from "@vue-storefront/core";

  export default defineComponent({
    components: {
      SfButton,
      SfImage
    },
    props: {
      title: {
        type: String,
        default: "",
      },
      subtitle: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: ""
      },
      buttonText: {
        type: String,
        default: ""
      },
      link: {
        type: String,
        default: ""
      }
    },
    setup() {
      return {
        addBasePath
      }
    }
  })
</script>
<style lang="scss" scoped>
.small-banner {
  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: var(--spacer-base);
    background-color: var(--_c-copia-secondary-yellow);
  }
  span {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--bold);
    text-transform: uppercase;
  }
  &__subtitle {
    color: var(--_c-copia-primary-black);
  }
  .sf-button {
    border-radius: 4px;
  }
}
</style>
