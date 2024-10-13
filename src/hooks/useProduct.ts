export const useProduct = async (id: number) => {
    return await fetch(`/api/product/${id}`)
}