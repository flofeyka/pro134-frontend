export const useProducts = async () => {
    return await fetch('/api/product');
}