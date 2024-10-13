import {authFetch} from "@src/lib/auth_fetch";

export const useProductsWithStopped = async () => {
    return await authFetch("/api/product/all");
}