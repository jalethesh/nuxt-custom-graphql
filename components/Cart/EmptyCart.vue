<template>
    <div class="empty-cart">
        <img src="/icons/empty-cart.svg" alt="empty-cart" class="mx-auto w-64 h-auto lg:w-auto object-cover object-center" />

        <h1 class=" mt-11 lg:mt-20 text-center font-montserrat">Your cart is empty</h1>

        <p class="text-center mt-2">
            Looks like you haven’t added any items to the
            <br />bag yet. Start shopping to fill it in.
        </p>
        <div class="mt-20 hidden lg:flex justify-center">
            <CopiaButton>START SHOPPING</CopiaButton>
        </div>

        <CopiaButton class="block lg:hidden my-20 sf-button--full-width">GO BACK SHOPPING</CopiaButton>
    </div>
</template>

<script>
import CopiaButton from '../Core/Atoms/CopiaButton.vue'
export default {
    components: {
        CopiaButton
    }
}
</script>

<style lang="scss" scoped>
.empty-cart {
    h1 {
        font-family: var(--font-family--primary);
        font-style: normal;
        font-weight: 900;
        font-size: 52px;
        line-height: 58px;
    }
    p {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
    }
}

@media (max-width: 1024px) {
    .empty-cart {
        h1 {
            font-family: var(--font-family--primary);
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 30px;
        }
    }
}
</style>