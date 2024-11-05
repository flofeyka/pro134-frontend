export const useProduct = async (id: number) => {
    try {
        const response = await fetch(`https://pro134.store/api/product/${id}`).then(res => res.json());
        return response;
    } catch (e) {
        console.log(e);
    }
}