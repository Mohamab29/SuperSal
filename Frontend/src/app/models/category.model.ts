import { ProductModel } from "./product.model";

export class CategoryModel {
    _id: string;
    name:string;
    product:ProductModel[];
}
