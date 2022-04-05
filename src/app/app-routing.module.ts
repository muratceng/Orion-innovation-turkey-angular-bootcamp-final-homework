import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './Pages/AdminProducts/admin-products.component';
import { CardDetailsComponent } from './Pages/CardDetails/CardDetails.component';
import { DashboardComponent } from './Pages/Dashboard/Dashboard.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { ProductDetailsComponent } from './Pages/ProductDetails/ProductDetails.component';
import { SignInComponent } from './Pages/SignIn/SignIn.component';
import { SignUpComponent } from './Pages/SignUp/SignUp.component';

const routes: Routes = [
  {
    path: 'SignIn',
    component: SignInComponent,
  },
  {
    path : 'Product/Details/:id',
    component:ProductDetailsComponent
  },
  {path:'AdminProducts',component:AdminProductsComponent},
  {
    path: 'SignUp',
    component: SignUpComponent,
  },
  { path: 'Dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/SignIn', pathMatch: 'full' },
  {path:'CardDetails', component:CardDetailsComponent},
  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
