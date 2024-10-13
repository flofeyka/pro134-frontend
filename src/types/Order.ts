import {IOrderProduct} from "@src/types/OrderProduct";

export interface IOrder {
    id: number
    surname?: string
    name?: string
    patronymic?: string
    organization?: string
    email: string
    phone: string
    region: string
    city: string
    address: string
    type: 'PHYSICAL' | 'JURIDICAL'

    products?: Array<IOrderProduct>

    created_at: string
    updated_at: string
}