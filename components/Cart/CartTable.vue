<template>
    <div class="w-full">
        <div class=" w-full">
            <CartItem v-for="product in products" :key="product.id" :product="product"/>
        </div>
        <div class=" mt-10">
            <CopiaButton color="Grey" @click="clearCart">
                CLEAR CART
            </CopiaButton>
        </div>
    </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import CopiaButton from "../Core/Atoms/CopiaButton.vue";
import { useCart } from "~/composables"
    export default {
    components: { CartItem, CopiaButton },
    props: {
        products: {
            type: Array,
            default: () => ([])
        }
    },
    setup(props) {
        const { clearCart } = useCart();

        return {
            clearCart
        }
    }
}
</script>

<style lang="scss" scoped>

</style>