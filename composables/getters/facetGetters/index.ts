import { AgnosticBreadcrumb, AgnosticCategoryTree } from '@vue-storefront/core';
import { categoryGetters, facetGetters } from '@vue-storefront/odoo';
import { Category } from '@vue-storefront/odoo-api';
import { SearchData } from '@vue-storefront/odoo/lib/composables/types';

const isNumeric = (num) => !isNaN(num);

const mapCategory = (category) => {
  return category.map((item) => ({
    id: item.id,
    label: item.name,
    slug: item.slug,
    isCurrent: false,
    parent: {
      id: item.parent?.id,
      label: item.parent?.name,
      slug: item.parent?.slug,
    },
    items: item.childs ? mapCategory(item.childs) : [],
  }));
};

const getCategoryTree = (category) => {
  return mapCategory(category);
};

const getBreadcrumbs = ({ input }: SearchData): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  breadcrumbs.push({
    text: input.currentRootCategory.name,
    link: `/c/${input.currentRootCategory.slug}/${input.currentRootCategory.id}`,
  });

  if (input.params.slug_2 && !isNumeric(input.params.slug_2)) {
    breadcrumbs.push({
      text: input.currentCategory.name,
      link: `/c/${input.currentCategory.slug}/${input.currentCategory.id}`,
    });
  }

  return breadcrumbs;
};

const getters = {
  ...facetGetters,
  getCategoryTree,
  getBreadcrumbs,
};

export default getters;
