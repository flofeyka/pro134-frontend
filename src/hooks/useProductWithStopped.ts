import {authFetch} from "@src/lib/auth_fetch";

export const useProductWithStopped = async (id: number) => {
    return await authFetch(`/api/product/${id}/with-stopped`)
}