export const usePopularProducts = async () => {
    return await fetch("/api/product/popular");
}