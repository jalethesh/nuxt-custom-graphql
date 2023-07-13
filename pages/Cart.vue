<template>
    <div id="cart" class=" px-4">
        <BreadCrumbs :bread-crumbs="breadcrumbs" class=" hidden lg:block" />
        <div class=" w-full flex flex-col-reverse lg:flex-row lg:space-x-5">
            <div class="cart-products w-full  lg:w-8/12 flex justify-center">
                <EmptyCart v-if="!totalItems"/>
                <CartTable v-else :products="products"/>
            </div>
            <div class="w-4/12 hidden lg:block">
                <CartInfo :cart="cart"/>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive } from "@nuxtjs/composition-api";
import { useCart } from "@vue-storefront/odoo";
import { useUiState, cartGetters } from "~/composables";
import EmptyCart from "~/components/Cart/EmptyCart.vue";
import CartTable from "~/components/Cart/CartTable.vue";
import CartInfo from "~/components/Cart/CartInfo.vue";
import BreadCrumbs from "~/components/Core/Atoms/BreadCrumbs.vue";
export default {
    name: "Cart",
    transition: "fade",
    setup() {
        const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
        const { cart, removeItem, updateItemQty, load: loadCart } = useCart();
        const products = computed(() => cartGetters.getItems(cart.value));
        const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
        const breadcrumbs = reactive([
            {
                text: "Home",
                link: "/",
            },
            {
                text: "Cart",
                link: "/cart",
                disabled: true
            },
        ]);
        /* onSSR(async () => {
            await loadCart({ customQuery : { cartLoad: 'copiaCartLoad' } });
        }); */
        return {
            products,
            removeItem,
            updateItemQty,
            isCartSidebarOpen,
            toggleCartSidebar,
            totalItems,
            cartGetters,
            breadcrumbs,
            cart
        };
    },
    components: { EmptyCart, CartTable, CartInfo, BreadCrumbs }
}
</script>

<style lang="scss" scoped>

</style>