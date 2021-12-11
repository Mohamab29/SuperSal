import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import store from 'src/app/redux/store';
import { ItemModel } from 'src/app/models/item.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ItemService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
})
export class AddProductDialogComponent implements OnInit {
  public item = new ItemModel();

  public quantityControl = new FormControl(null, [
    Validators.min(1),
    Validators.max(50),
    Validators.required,
  ]);
  public quantityForm = new FormGroup({
    quantityControl: this.quantityControl,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private notify: NotifyService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.item.product = this.data.product;
    this.item.cartId = store.getState().cartState.cart._id;
    this.item.productId = this.item.product._id;

    this.quantityControl.setValue(1);
  }
  public async addItemQuantity() {
    try {
        this.item.quantity = this.quantityControl.value;
        this.item.totalPrice = this.item.product.price * this.item.quantity;
        await this.itemService.addItem(this.item);
    } catch (error) {
        this.notify.error(error);
    }
  }
}
