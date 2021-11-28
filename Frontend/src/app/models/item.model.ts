import { ProductModel } from './product.model';
export class ItemModel {
  productId: string;
  cartId: string;
  quantity: number;
  totalPrice: number;
  _id: string;
  product: ProductModel;
}
