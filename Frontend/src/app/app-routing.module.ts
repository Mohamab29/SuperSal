import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { WelcomePageComponent } from './components/home-area/welcome-page/welcome-page.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'welcome-page', pathMatch: 'full' }, // pathMath: full = exact in React
  { path: '**', component: PageNotFoundComponent }, // 404 - must be last!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
