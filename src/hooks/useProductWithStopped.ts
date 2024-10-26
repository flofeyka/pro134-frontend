import {authFetch} from "@src/lib/auth_fetch";

export const useProductWithStopped = async (id: number) => {
    return await authFetch(`https://pro134.store/api/product/${id}/with-stopped`)
}