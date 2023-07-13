import { useCart } from '~/composables';
import { CopiaOrderLine } from '~/copia-api/types'
import { useCart as baseUseCart } from '@vue-storefront/odoo';

const useCollectedProduct = (): any => {
    const { removeItem, loading } = baseUseCart();
    const { cartUpdateItem } = useCart()

    const handleUpdateItem = async (orderLine: CopiaOrderLine, quantity: number) => {
        await cartUpdateItem(orderLine.id, Number(quantity))
    }

    const handleRemoveItem = async (orderLine: CopiaOrderLine) => {
        await removeItem({ product: orderLine, customQuery: {
            cartRemoveItem: 'copiaCartRemoveItem'
        } })
    }

    return {
        loading,
        handleRemoveItem,
        handleUpdateItem
    }
}

export default useCollectedProduct;
