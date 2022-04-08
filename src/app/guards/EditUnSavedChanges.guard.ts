import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../Pages/AddProduct/add-product.component';
import { EditProductComponent } from '../Pages/EditProduct/edit-product.component';

@Injectable({
  providedIn: 'root'
})
export class EditUnsavedChangesGuard implements CanDeactivate<EditProductComponent> {
  canDeactivate(
    component: EditProductComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canExit();
  }

}
