import { CategoryModel } from "./category.model";

export class ProductModel {
    _id: string;
    name: string;
    price: number;
    categoryId: string;
    imageName: string;
    image:FileList;
    category: CategoryModel;
}
