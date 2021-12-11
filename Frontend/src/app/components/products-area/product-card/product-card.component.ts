import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public imageAddress: string;

  constructor(public dialog: MatDialog) {}
  @Input()
  public product: ProductModel;
  public openDialog() {
    this.dialog.open(AddProductDialogComponent, {
      disableClose: true,
      data: { product: this.product },
    });
  }
  ngOnInit(): void {
    this.imageAddress = environment.imagesUrl + this.product.imageName;
  }
}
