import { OrderService } from './../../../services/orders.service';
import { ProductsService } from './../../../services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsActionType } from './../../../redux/products-state';
import store from 'src/app/redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-website-information',
  templateUrl: './website-information.component.html',
  styleUrls: ['./website-information.component.css'],
})
export class WebsiteInformationComponent implements OnInit,OnDestroy {
  public productsLength = 0;
  public ordersLength = 0;
  public unsubscribe: Unsubscribe;
  constructor(
    private notify: NotifyService,
    private productService: ProductsService,
    private orderService:OrderService
  ) {}

  async ngOnInit() {
    try {
      const products = await this.productService.getAllProductsAsync();
      const orders = await this.orderService.getAllOrdersAsync();

      this.productsLength = products.length;
      this.ordersLength = orders.length;
      this.unsubscribe = store.subscribe(() => {
        this.productsLength = store.getState().productsState.products.length;
        this.ordersLength = store.getState().ordersState.orders.length;
      });
    } catch (error: any) {
      this.notify.error(error);
    }
  }
  ngOnDestroy():void{
    this.unsubscribe();
  }
}
