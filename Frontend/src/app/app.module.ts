import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { StartShoppingComponent } from './components/home-area/start-shopping/start-shopping.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { WebsiteInformationComponent } from './components/home-area/website-information/website-information.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartSidebarComponent } from './components/cart-area/cart-sidebar/cart-sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    StartShoppingComponent,
    LogoutComponent,
    WebsiteInformationComponent,
    ProductsListComponent,
    CartSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // AJAX infrastructure
    MatSidenavModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
