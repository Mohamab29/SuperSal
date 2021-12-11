import { ItemService } from './../../../services/items.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ItemModel } from './../../../models/item.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input()
  public cartItem: ItemModel;
  @Input()
  public isOrder: boolean = false;
  
  public imageAddress: string;
  constructor(
    private notify: NotifyService,
    private itemService: ItemService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.imageAddress = environment.imagesUrl + this.cartItem.product.imageName;
  }

  public async deleteItem(_id: string) {
    try {
      await this.itemService.deleteItemById(_id);
    } catch (error) {
      this.notify.error(error);
    }
  }
}
