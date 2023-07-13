import { cartGetters } from "@vue-storefront/odoo";
import { CopiaCart, CopiaOrderLine } from '~/copia-api/types';

const getItemTitle = (orderline: CopiaOrderLine): string => 
    orderline?.product?.name || '';

const itemHasDiscount = (orderline: CopiaOrderLine) : boolean => orderline?.product?.combinationInfo?.has_discounted_price || false;

const getPriceBeforeDiscount = (orderline: CopiaOrderLine): number => orderline?.product?.combinationInfo?.list_price || 0;

const getActualPrice = (orderline: CopiaOrderLine): number => orderline?.product?.combinationInfo?.price || 0;

const getItemImage = (orderline: CopiaOrderLine): string => orderline?.product?.image || ''; 

const getItems = (cart: CopiaCart): CopiaOrderLine[] => cart?.order?.websiteOrderLine;

const getTotalItems = (cart: CopiaCart): number => cart?.order?.websiteOrderLine?.length || 0;

const getters = {
    ...cartGetters,
    getItems,
    getTotalItems,
    getItemImage,
    getItemTitle,
    itemHasDiscount,
    getPriceBeforeDiscount,
    getActualPrice
}

export default getters;