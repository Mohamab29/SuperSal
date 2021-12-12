import { UserModel } from './../../../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  public product = new ProductModel();
  public categories: CategoryModel[] = [];
  public isAdd = true;
  public user: UserModel;
  // Controls:
  public nameControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('^[A-Z].*$'),
    Validators.maxLength(30),
    Validators.minLength(2),
  ]);
  public priceControl = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(1000),
  ]);
  public categoryIdControl = new FormControl(null, Validators.required);
  public imageControl = new FormControl();

  // Form:
  public productForm = new FormGroup({
    nameControl: this.nameControl,
    priceControl: this.priceControl,
    imageControl: this.imageControl,
    categoryIdControl: this.categoryIdControl,
  });

  @Input()
  public existingProduct: ProductModel | boolean = false;
  @Input()
  public opened: string;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notify: NotifyService,
    private http: HttpClient
  ) {}
  public initializeControls(p: ProductModel) {
    this.nameControl.setValue(p.name);
    this.priceControl.setValue(p.price);
    this.categoryIdControl.setValue(p.categoryId);
  }
  public setImage(args: Event): void {
    this.product.image = (args.target as HTMLInputElement).files;
  }
  public async handleSubmit(): Promise<void> {
    try {
      this.product.name = this.nameControl.value;
      this.product.price = this.priceControl.value;
      this.product.categoryId = this.categoryIdControl.value;

      const categoryIndex = this.categories.findIndex(
        (c) => c._id == this.product.categoryId
      );
      this.product.category = this.categories[categoryIndex];

      if (this.isAdd) {
        await this.productsService.addProductAsync(this.product);
        this.notify.success('Product added successfully');
      } else {
        await this.productsService.updateProductAsync(this.product);
        this.notify.success('Product updated successfully');
      }
      this.isAdd = true;
    } catch (error) {
      this.notify.error(error);
    }
  }
  async ngOnInit() {
    try {
      if (this.existingProduct) {
        this.product = { ...(this.existingProduct as ProductModel) };
        this.initializeControls(this.product);
        this.isAdd = false;
      }
      this.categories = await this.http
        .get<CategoryModel[]>(environment.categoriesUrl)
        .toPromise();
      this.user = store.getState().authState.user;
      if (!this.user.isAdmin) {
        this.notify.error("You're not authorized to use this feature!");
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    } catch (error: any) {
      this.notify.error(error);
      if (error.status === 403 || error.status === 401) {
        this.router.navigateByUrl('/logout');
      }
    }
  }
}
