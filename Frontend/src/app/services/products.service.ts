import { ProductModel } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import store from '../redux/store';
import { environment } from 'src/environments/environment';
import { ProductsActionType } from '../redux/products-state';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public async getAllProductsAsync(): Promise<ProductModel[]> {
    if (store.getState().productsState.products.length === 0) {
      const products = await this.http
        .get<ProductModel[]>(environment.productsUrl)
        .toPromise();
      store.dispatch({
        type: ProductsActionType.ProductsDownloaded,
        payload: products,
      });
      return products;
    }
    return store.getState().productsState.products;
  }
  public async findProductsByPattern(value: string): Promise<ProductModel[]> {
    const products = await this.http
      .get<ProductModel[]>(environment.searchProductsUrl + value)
      .toPromise();
    return products;
  }

  public async getOneProductAsync(_id: string): Promise<ProductModel> {
    const products = await this.getAllProductsAsync();
    return products.find((p) => p._id === _id);
  }

  public async addProductAsync(product: ProductModel): Promise<ProductModel> {
    const myFormData = new FormData();
    myFormData.append('name', product.name);
    myFormData.append('price', product.price.toString());
    myFormData.append('categoryId', product.categoryId);
    myFormData.append('image', product.image.item(0));
    const imageName = await this.http
      .post(environment.imagesUrl, myFormData, { responseType: 'text' })
      .toPromise();
    myFormData.append('imageName', imageName);
    const addedProduct = await this.http
      .post<ProductModel>(environment.productsUrl, myFormData)
      .toPromise();
    addedProduct.category = { ...product.category };
    store.dispatch({
      type: ProductsActionType.ProductAdded,
      payload: addedProduct,
    });
    return addedProduct;
  }

  public async updateProductAsync(
    product: ProductModel
  ): Promise<ProductModel> {
    const myFormData = new FormData();
    myFormData.append('name', product.name);
    myFormData.append('price', product.price.toString());
    myFormData.append('categoryId', product.categoryId);

    if (product.image) {
      myFormData.append('image', product.image.item(0));
      const imageName = await this.http
      .post(environment.imagesUrl, myFormData, { responseType: 'text' })
        .toPromise();
      myFormData.append('imageName', imageName);
      console.log(imageName);
    }
    console.log(product.image);
    const updatedProduct = await this.http
      .patch<ProductModel>(environment.productsUrl + product._id, myFormData)
      .toPromise();
    updatedProduct.category = { ...product.category };

    store.dispatch({
      type: ProductsActionType.ProductUpdated,
      payload: updatedProduct,
    });
    return updatedProduct;
  }
  public async deleteProduct(_id: string) {
    await this.http
      .delete<ProductModel>(environment.productsUrl + _id)
      .toPromise();
    store.dispatch({ type: ProductsActionType.ProductDeleted, payload: _id });
  }
}
