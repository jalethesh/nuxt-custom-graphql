<template>
  <button
    class="box-tab p-5 flex justify-between"
    :class="{ 'active': active, 'description-only': !title }"
    @click="$emit('click')"
  >
    <SfHeading
      v-if="title"
      :level="5"
      :title="title"
      :description="content"
      class="sf-heading--left pr-8"
    />
    <slot v-else name="content" />
    <SfIcon
      v-if="active"
      icon="check"
      color="red-primary"
    />
  </button>
</template>
<script lang="ts">
import { SfIcon, SfButton, SfHeading } from '@storefront-ui/vue';

export default {
  name: "BoxTab",
  components: {
    SfIcon,
    SfButton,
    SfHeading
  },
  props: {
    title: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const handleChangeState = () => {

    }
  }
}
</script>
<style lang="scss" scoped>
  button {
    border: 1px solid var(--_c-copia-gray-dark-accent);
    opacity: 0.4;
    font-family: var(--font-family--primary);
    .sf-heading {
      &__description {
        line-height: 24px;
        color: var(--_c-copia-secondary-gray);
        font-weight: var(--font-weight--semibold);
      }
    }
    &.active {
      border: 1px solid var(--_c-copia-primary-red);
      opacity: 1;
    }
    &.description-only {
      border: 1px solid var(--_c-copia-secondary-gray);
      opacity: 1;
      line-height: 24px;
      color: var(--_c-copia-secondary-black);
      font-weight: var(--font-weight--semibold);
      &.active {
        border: 1px solid var(--_c-copia-primary-red);
      }
    }
  }
</style>