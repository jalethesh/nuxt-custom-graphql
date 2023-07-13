<template>
  <SfButton :class="classes" @click="$emit('click')" v-bind="$attrs" :disabled="disabled">
    <slot />
  </SfButton>
</template>

<script lang="ts">
import { SfButton } from '@storefront-ui/vue';
import {
  defineComponent,
  PropType,
  ComputedRef,
  computed,
} from '@nuxtjs/composition-api';
import { ButtonColor, ButtonShape, ButtonSize } from '~/copia-api/types';
export default defineComponent({
  components: {
    SfButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: ButtonShape.Round,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: ButtonSize.Medium,
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: ButtonColor.Yellow,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const colorClass: ComputedRef<string> = computed(() => {
      switch (props.color) {
        case ButtonColor.Yellow:
          return 'color-warning text-black';
        case ButtonColor.Red:
          return 'color-danger';
        case ButtonColor.Black:
          return 'color-secondary';
        case ButtonColor.Grey:
          return 'color-light text-black';
        default:
          return 'color-warning text-black';
      }
    });

    const classes: ComputedRef<string> = computed(
      () =>
        `${
          colorClass.value
        } ${props.shape.toLocaleLowerCase()} ${props.size.toLocaleLowerCase()} ${props.outline?'btn-outline text-black':''}`
    );

    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
.sf-button {
  &.btn-outline {
    background-color: transparent;
    &.color-warning {
      border: 3px solid var(--_c-copia-primary-yellow);
    }
    &.color-secondary, &.color-light {
      border: 3px solid var(--_c-copia-primary-black);
    }
    &.color-danger {
      border: 3px solid var(--_c-copia-primary-red);
    }
    &:active {
      --button-background: transparent;
    }
  }
  --c-warning: var(--_c-copia-secondary-yellow);
  // transition: all 3ms;
  &:hover {
    --button-box-shadow-opacity: 0;
    outline: solid;
    outline-width: 5px;
    &.color-warning {
      outline-color: #FECB064C;
    }
    &.color-secondary, &.color-light {
      outline-color: #1D1F224C;
    }
    &.color-danger {
      outline-color: #E81E2B4C;
    }
  }
  &:active {
    outline: none;
  }
}

.medium {
  padding: 15px 30px;
}

.small {
  padding: 8.5px 24px;
  font-size: var(--font-size--sm);
  font-weight: var(--font-weight--bold);
}

.rectangle {
  border-radius: 0px;
}
</style>
