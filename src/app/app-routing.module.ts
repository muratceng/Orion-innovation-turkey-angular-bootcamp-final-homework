import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/Admin.guard';
import { LoggedUserGuard } from './guards/LoggedUser.guard';
import {  LoginPermissionGuard } from './guards/LoginPermission.guard';
import { AddProductComponent } from './Pages/AddProduct/add-product.component';
import { AdminProductsComponent } from './Pages/AdminProducts/admin-products.component';
import { CardDetailsComponent } from './Pages/CardDetails/CardDetails.component';
import { DashboardComponent } from './Pages/Dashboard/Dashboard.component';
import { EditProductComponent } from './Pages/EditProduct/edit-product.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { ProductDetailsComponent } from './Pages/ProductDetails/ProductDetails.component';
import { SignInComponent } from './Pages/SignIn/SignIn.component';
import { SignUpComponent } from './Pages/SignUp/SignUp.component';

const routes: Routes = [
  {
    path: 'SignIn',
    component: SignInComponent, canActivate:[LoggedUserGuard]
  },
  {
    path : 'Product/Details/:id',
    component:ProductDetailsComponent, canActivate:[LoginPermissionGuard]
  },
  {path:'AddProduct',component:AddProductComponent, canActivate:[AdminGuard]},
  {path:'EditProduct/:id', component:EditProductComponent, canActivate:[AdminGuard]},
  {path:'AdminProducts',component:AdminProductsComponent, canActivate:[AdminGuard]},
  {
    path: 'SignUp',
    component: SignUpComponent, canActivate:[LoggedUserGuard]
  },
  { path: 'Dashboard', component: DashboardComponent, canActivate:[LoginPermissionGuard] },
  { path: '', redirectTo: '/SignIn', pathMatch: 'full' },
  {path:'CardDetails', component:CardDetailsComponent, canActivate:[LoginPermissionGuard]},
  { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
