import { wishlistGetters } from "@vue-storefront/odoo";
import { CopiaWishlist, CopiaWishlistItems } from '~/copia-api/types';

const getTotalItems = (wishlist: CopiaWishlist): number => wishlist?.wishlistItems?.length || 0;

const getItems = (wishlist: CopiaWishlist): CopiaWishlistItems[] => wishlist?.wishlistItems || [];

const getTotals = (wishlist: CopiaWishlist): number => {
    let total = 0;

    for(const item of wishlist?.wishlistItems) {
        total = total + item?.product?.combinationInfo?.price || 0
    }

    return total;
}

const getters = {
    ...wishlistGetters,
    getTotalItems,
    getItems,
    getTotals
}

export default getters;