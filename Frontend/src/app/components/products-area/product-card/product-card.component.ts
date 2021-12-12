import { UserModel } from 'src/app/models/user.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public imageAddress: string;
  public user: UserModel;
  constructor(public dialog: MatDialog) {}
  @Input()
  public product: ProductModel;
  @Output()
  public emittedProduct = new EventEmitter<ProductModel>();
  public openDialog() {
    this.dialog.open(AddProductDialogComponent, {
      disableClose: true,
      data: { product: this.product },
    });
  }
  public editProduct(){
    this.emittedProduct.emit(this.product);
  }
  ngOnInit(): void {
    this.imageAddress = environment.imagesUrl + this.product.imageName;
    this.user = store.getState().authState.user;
  }
}
