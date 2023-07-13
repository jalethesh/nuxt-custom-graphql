<template>
  <div class="sidebar desktop-only">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfAccordion :open="accordionName" showChevron transition="sf-expand">
        <SfAccordionItem
          v-for="(cat, i) in categoryTree"
          :key="i"
          :header="cat.label"
          style="margin-bottom: 10px"
        >
          <template
            v-if="cat.items.length > 0"
            #header="{ accordionClick, isOpen }"
          >
            <div
              @click="accordionClick"
              :style="{ cursor: 'pointer' }"
              class="category__header"
              :class="isOpen ? 'active' : ''"
            >
              <div class="flex justify-between items-center">
                <div to="">{{ cat.label }}</div>
                <svg
                  width="14"
                  height="7"
                  viewBox="0 0 14 7"
                  fill="none"
                  class="flex-shrink-0 flex-grow-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.20913e-08 0.954545L1.12025 1.33588e-08L7 5.07793L12.8798 1.5359e-07L14 0.954546L6.99994 7L7.20913e-08 0.954545Z"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </template>
          <template v-else #header>
            <nuxt-link
              :to="localePath(getCatLink({ parent: cat }))"
              class="category__header"
              :class="
                currentCategoryNameForAccordion === cat.label ? 'active' : ''
              "
              >{{ cat.label }}</nuxt-link
            >
          </template>
          <template v-if="cat.items.length > 0">
            <div class="w-full flex justify-between">
              <nuxt-link
                :to="localePath(getCatLink({ parent: cat }))"
                class="text"
                :class="isCurrent('all') ? 'underline' : ''"
                >All</nuxt-link
              >
            </div>
            <SfList class="list">
              <SfListItem v-for="(subCat, j) in cat.items" :key="j">
                <SfMenuItem
                  :data-cy="`category-link_subcategory_${subCat.slug}`"
                  :label="subCat.label"
                >
                  <template #label="{ label }">
                    <nuxt-link
                      :to="
                        localePath(
                          getCatLink({ parent: subCat.parent, child: subCat })
                        )
                      "
                      class="text-left"
                      :class="isCurrent(subCat.slug) ? 'underline' : ''"
                      >{{ label }}</nuxt-link
                    >
                  </template>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </template>
        </SfAccordionItem>
      </SfAccordion>
    </SfLoader>
  </div>
</template>

<script>
import { SfList, SfMenuItem, SfAccordion, SfLoader } from '@storefront-ui/vue';
import { useUiHelpers } from '~/composables';
import { computed } from '@vue/composition-api';
export default {
  components: {
    SfAccordion,
    SfLoader,
    SfList,
    SfMenuItem,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    currentCategory: {
      type: Object,
      default: () => ({}),
    },
    categoryTree: {
      type: Array,
      default: () => [],
    },
    currentRootCategory: {
      type: Object,
      default: () => ({}),
    },
    currentCategoryNameForAccordion: {
      type: String,
      default: '',
    },
  },
  setup(props, { root }) {
    const { getCatLink, getAllCatLink } = useUiHelpers();

    const isCurrent = (slug) => {
      if (slug === props.currentCategory?.slug) {
        return true;
      }

      if (slug === 'all' && !props.currentCategory?.slug) {
        return true;
      }

      return false;
    };

    const accordionName = computed(() =>
      props.currentRootCategory?.childs
        ? props.currentCategoryNameForAccordion
        : ''
    );
    return {
      getCatLink,
      getAllCatLink,
      isCurrent,
      accordionName,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;

  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}

.category__header {
  font-family: var(--font-family--primary);
  color: var(--_c-copia-primary-black);
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  svg {
    transition: all 0.3s ease-in-out;

    path {
      color: var(--_c-copia-primary-black);
      fill: var(--_c-copia-primary-black);
    }
  }
}

.category__header.active {
  color: var(--_c-copia-primary-red);

  svg {
    transform: rotate(180deg);

    path {
      fill: var(--_c-copia-primary-red);
      color: var(--_c-copia-primary-red);
    }
  }
}

.list {
  --menu-item-font-size: 18px;

  --menu-item-font-family: var(--font-family--primary) &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
</style>
