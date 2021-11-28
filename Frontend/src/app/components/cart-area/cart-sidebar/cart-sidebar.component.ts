import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {

  constructor() { }

  @Input()
  public opened:string;

  public showFiller = false;
  ngOnInit(): void {
  }

}
