import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faCartShopping, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCardService } from "src/app/services/ShoppingCard.service";

@Component({
    selector:'Navbar-selector',
    templateUrl:'./Navbar.component.html',
    styleUrls:['./Navbar.component.css']
})
export class NavbarComponent implements OnInit{
    constructor(private router:Router, private cardService:ShoppingCardService){}
    faShoppinCard = faCartShopping
    falogout = faSignOut
    shoppingCard=this.cardService.getItems();
    ngOnInit(): void {
        
    }

    // kullanıcı çıkışında localstoragei siler ve giriş ekranına yönlendirir.
    logOut(){
        localStorage.clear();
        this.router.navigate(['./SignIn'])
    }

    // kullanıcıyı ana ekrana yönlendirir.
    goHome(){
        this.router.navigate(['./Dashboard'])
    }

    // Sepetin detay sayfasına yönlendirir.
    goDetails(){
        this.router.navigate(['./CardDetails'])
    }

    // Sepetteki ürünü siler.
    deleteProduct(title:String){
        console.log(title);
        this.shoppingCard=this.cardService.deleteFromCard(title);
    }
    
}