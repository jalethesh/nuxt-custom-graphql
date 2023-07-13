import { ComputedRef, useRoute, computed } from '@nuxtjs/composition-api';
// import { FacetSearchResult } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { Category } from '@vue-storefront/odoo-api';
// import { FacetResultsData } from '@vue-storefront/odoo/lib/composables/types';

type useUiCategoryHelper = {
  currentRootCategory: ComputedRef<any>;
  categoryTree: ComputedRef<any>;
  currentCategory: ComputedRef<any>;
  categoryBanner: ComputedRef<string>;
};

const useUiHelpers = (
  results
): useUiCategoryHelper => {
  const { path } = useRoute().value;

  const formateResults = computed(() => {
    const newResults = { ...results };
    if (newResults.data?.categories) {
      newResults.data.categories[0] = results?.data?.categories?.[0]?.parent;
    }
    return newResults;
  });

  const categoryBanner = computed(
    () =>
      results?.data?.categories?.[0]?.parent?.parent?.bannerImage ||
      results?.data?.categories?.[0]?.parent?.bannerImage ||
      results?.data?.categories?.[0].bannerImage ||
      null
  );

  const parentTree = computed(() => facetGetters.getCategoryTree(results));
  const childTree = computed(() =>
    facetGetters.getCategoryTree(formateResults.value)
  );

  const categoryTree = computed(() =>
    parentTree.value.id ? parentTree.value : childTree.value || {}
  );

  const currentRootCategory = computed(
    () => results?.data?.categories?.[0] || { childs: [] }
  );

  const currentCategory = computed<Category | any>(() => {
    let category = { name: '', slug: '' };

    currentRootCategory.value?.childs?.forEach((element) => {
      element?.childs?.forEach((element) => {
        if (element.slug === path) {
          category = element;
        }
      });
    });

    return category;
  });

  return {
    categoryTree,
    currentCategory,
    currentRootCategory,
    categoryBanner,
  };
};

export default useUiHelpers;
