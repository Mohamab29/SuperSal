import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { LayoutComponent } from './components/LayoutArea/layout/layout.component';
import { HeaderComponent } from './components/LayoutArea/header/header.component';
import { FooterComponent } from './components/LayoutArea/footer/footer.component';
import { PageNotFoundComponent } from './components/LayoutArea/page-not-found/page-not-found.component';
import { HomeComponent } from './components/HomeArea/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // AJAX infrastructure
  ],
  providers: [],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
