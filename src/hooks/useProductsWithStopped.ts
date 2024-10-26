import {authFetch} from "@src/lib/auth_fetch";

export const useProductsWithStopped = async () => {
    return await authFetch("https://pro134.store/api/product/all");
}