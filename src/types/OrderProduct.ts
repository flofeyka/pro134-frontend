import {IProduct} from "@src/types/Product";

export interface IOrderProduct {
    id: number
    product_id: number
    order_id: number
    count: number

    product?: IProduct
}