import {
    AgnosticMediaGalleryItem
  } from '@vue-storefront/core';
import { productGetters } from "@vue-storefront/odoo";
import { Product, AttributeValue } from '@vue-storefront/odoo-api';
import { CopiaProduct } from "~/copia-api/types";

const productHasDiscount = (product: CopiaProduct) : boolean => product?.combinationInfo?.has_discounted_price || false;

const getPriceBeforeDiscount = (product: CopiaProduct): number => product?.combinationInfo?.list_price || 0;

const getActualPrice = (product: CopiaProduct): number => product?.combinationInfo?.price || 0;

const getImage = (product: CopiaProduct): string => product?.image || '';

const getSku = (product: CopiaProduct): string => product?.sku || ""

const getGallery = (
    product: CopiaProduct
  ): AgnosticMediaGalleryItem[] => {
    const images: AgnosticMediaGalleryItem[] = [];

    const normal = product?.realProduct?.product?.image || product?.image || '';
    const big = normal;

    images.push({
        small: `${product?.thumbnail || ''}`,
        big,
        normal
    });

    return images;
};

const getters = {
    ...productGetters,
    getGallery,
    productHasDiscount,
    getPriceBeforeDiscount,
    getActualPrice,
    getImage,
    getSku
}

export default getters;