import {Context, createContext} from "react";

export type OrderData = {
    stage: 1 | 2,
    type: 'juridical' | 'physical'
}

export const OrderContext:Context<OrderData> = createContext(null)