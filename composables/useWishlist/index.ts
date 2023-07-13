/* eslint-disable no-prototype-builtins */
import { computed, ref } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';
import { useWishlist as baseUseWishlist } from '@vue-storefront/odoo';

const useWishlist = () => {
    const { wishlist, setWishlist } = baseUseWishlist()
    const context = useVSFContext();

    const errors = ref({ graphQLErrors: [] });

    const load = async () => {
        try {
            const { data } = await context.$odoo.api.getWishlist();

            // if(data) {
                setWishlist(data?.wishlistItems);
            // }
        } catch (error) {
            errors.value = error;
        }
    };

    return {
        load,
        errors,
        wishlist: computed(()=>wishlist.value),
    }
}

export default useWishlist;