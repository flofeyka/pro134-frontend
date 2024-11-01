import {IProduct} from "@src/types/Product";
import NoPhoto from "@img/no_photo.jpg"

export const useProductImage: (p: IProduct) => string = (p) => {
    return p?.photos && p.photos?.length < 1 ? NoPhoto : '/api/public/' + p.photos[0].source
}