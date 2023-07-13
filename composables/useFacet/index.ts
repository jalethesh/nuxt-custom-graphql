import { Context, FacetSearchResult, useFacetFactory } from '@vue-storefront/core';
import { ProductSortInput } from '@vue-storefront/odoo-api';
import { AgnosticFacetSearchParams } from '~/copia-api/types';

const factoryParams = {
    search: async (context: Context, params: FacetSearchResult<AgnosticFacetSearchParams>) => {
        const { customQueryProducts } = params.input;

        const productParams = {
            pageSize: params.input.pageSize,
            currentPage: params.input.currentPage,
            sort: params.input.sort as ProductSortInput,
            filter: params.input.filter,
            search: params.input.search,
        };

        const { data: productData } = await context.$odoo.api.getProductTemplatesList(productParams, customQueryProducts);

        return {
            products: productData.products.products,
            itemsPerPage: 1,
            facets: {},
            perPageOptions: 20,
            totalProducts: productData.products.totalCount,
            attributes: productData.products.attributeValues,
        }
    }
}

export default useFacetFactory<any>(factoryParams);