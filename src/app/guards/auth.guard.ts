import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PermissionDeniedModalComponent } from '../Components/PermissionDeniedModal/PermissionDenied.component';
import { UserService } from '../services/UserService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private userService:UserService,private modal:NgbModal){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userService.isLogIn()){
        this.modal.open(PermissionDeniedModalComponent)
        this.router.navigate(['SignIn'])
      }

    return true;
  }
  
}
