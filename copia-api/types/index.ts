import { Product, OrderLine, Order, Cart, Wishlist, ProductSortInput } from '@vue-storefront/odoo-api';

export enum ButtonShape {
    Round = "Rounded",
    Rectangle = "Rectangle",
}

export enum ButtonSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}
export enum ButtonColor {
    Yellow = "Yellow",
    Red = "Red",
    Black = "Black",
    Grey = "Grey",
}
export interface CombinationInfo {
    product_id: number;
    product_template_id: number;
    display_name: string;
    display_image: true;
    price: number;
    list_price: number;
    has_discounted_price: boolean;
    discount: number;
    discount_perc: number;
    grade_name: number;
    slug: string;
    stock_qty: number;
}
export interface CopiaProduct extends Product {
    isInStock?: boolean;
    combinationInfo?: CombinationInfo;
    qty?: number;
    sku?: string
    thumbnail?: string
}

export interface CopiaOrderLine extends OrderLine {
    product?: CopiaProduct;
}

export interface CopiaOrder extends Order {
    orderLines?: CopiaOrderLine[];
    websiteOrderLine?: CopiaOrderLine[];
}

export interface CopiaCart extends Cart {
    order: CopiaOrder
}

export interface CopiaWishlistItems {
    id: number,
    partner: any,
    product: CopiaProduct
    variant:any

}
export interface CopiaWishlist extends Wishlist {
    wishlistItems: CopiaWishlistItems[];
}

export interface PartnerInput {
    firstName: string;
    lastName: string;
    phone: string
}

export interface SetAddressParams {
    customer?: PartnerInput;
    receivingAgentId?: number;
    remoteCustomer?: PartnerInput;
}

export interface Payment {
    name: string;
    image: string;
    description?: string;
}
export interface LoginFormInput {
    email: string;
    password: string;
};

export interface RegisterFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export interface ResetPasswordFormInput {
    email: string;
};

export interface GuestFormInput {
    firstName: string;
    lastName: string;
    phone: string;
};

export declare type ParamsFromUrlFilterInput = {
    attributeValueId: number[],
    [x: string]: any
};

export declare type AgnosticFacetSearchParams = {
    filter: ParamsFromUrlFilterInput;
    currentPage: number;
    pageSize: number;
    search: string;
    sort: ProductSortInput;
    customQueryProducts: any;
    [x: string]: any;
};