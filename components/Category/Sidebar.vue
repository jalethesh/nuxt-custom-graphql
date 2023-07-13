<template>
  <LazyHydrate when-idle>
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="toggleFilterSidebar"
    >
      <div class="filters desktop-only">
        <div v-for="(facet, i) in facets" :key="i">
          <template v-if="facetHasMoreThanOneOption(facet)">
            <SfHeading
              :level="4"
              :title="facet.label"
              class="filters__title sf-heading--left"
              :key="`filter-title-${facet.value}`"
            />
            <div
              v-if="isFacetColor(facet)"
              class="filters__colors"
              :key="`${facet.value}-colors`"
            >
              <SfColor
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_color_${option.value}`"
                :color="option.htmlColor"
                :selected="isFilterSelected(option)"
                class="filters__color"
                @click="() => selectFilter(facet, option)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_${facet.id}_${option.value}`"
                :label="
                  option.label + `${option.count ? ` (${option.count})` : ''}`
                "
                :selected="isFilterSelected(option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </template>
        </div>
      </div>
      <SfAccordion class="filters smartphone-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfAccordionItem
            :key="`filter-title-${facet.id}`"
            :header="facet.label"
            class="filters__accordion-item"
          >
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.label"
              :selected="isFilterSelected(option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </SfAccordionItem>
        </div>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <CopiaButton class="sf-button px-12" @click="applyFilters">
            {{ $t('Done') }}
          </CopiaButton>
          <CopiaButton
            class="sf-button mt-4"
            color="Grey"
            @click="clearFilters"
            >{{ $t('Clear all') }}</CopiaButton
          >
        </div>
      </template>
    </SfSidebar>
  </LazyHydrate>
</template>

<script>
import {
  SfSidebar,
  SfHeading,
  SfFilter,
  SfAccordion,
  SfColor,
} from '@storefront-ui/vue';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiHelpers, useUiState } from '~/composables';
import CopiaButton from '../Core/Atoms/CopiaButton.vue';
import { facetGetters } from '@vue-storefront/odoo';
export default {
  components: {
    LazyHydrate,
    SfAccordion,
    SfFilter,
    SfColor,
    SfHeading,
    SfSidebar,
    CopiaButton,
  },
  props: {
    result: {
      type: Object,
      default: () => ({}),
    }
  },
  setup(props, { root }) {
    const { isFilterSidebarOpen, toggleFilterSidebar } = useUiState();
    const { changeFilters, isFacetColor, facetsFromUrlToFilter } =
      useUiHelpers();

    const selectedFilters = ref([]);
    const facets = computed(() =>
      facetGetters.getGrouped(props.result, [
        'color',
        'size',
        'material',
        'price',
      ])
    );

    console.log(facets)

    onMounted(() => {
      selectedFilters.value = facetsFromUrlToFilter();
    });

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      selectedFilters.value = [];
      changeFilters(selectedFilters.value);
    };

    const facetHasMoreThanOneOption = (facet) =>
      facet?.options?.length > 1 || false;

    const isFilterSelected = (option) => {
      return selectedFilters.value.some(
        (filter) => String(filter.id) === String(option.value)
      );
    };

    const selectFilter = (facet, option) => {
      const alreadySelectedIndex = selectedFilters.value.findIndex(
        (filter) => String(filter.id) === String(option.value)
      );

      if (alreadySelectedIndex === -1) {
        selectedFilters.value.push({
          filterName: facet.label,
          label: option.label,
          id: option.value,
        });

        return;
      }

      selectedFilters.value.splice(alreadySelectedIndex, 1);
    };

    return {
      isFilterSidebarOpen,
      toggleFilterSidebar,
      facets,
      applyFilters,
      clearFilters,
      facetHasMoreThanOneOption,
      isFacetColor,
      isFilterSelected,
      selectFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/sidebar.scss';
</style>
