import {authFetch} from "@src/lib/auth_fetch";

export const useOrders = async () => {
    return await authFetch('/api/order');
}