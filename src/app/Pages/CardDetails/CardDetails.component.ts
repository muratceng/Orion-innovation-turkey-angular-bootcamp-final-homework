import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../models/Product.model";
import { ShoppingCardItem } from "../../models/ShoppingCardItem.model";
import { User } from "../../models/User.model";
import { OrderService } from "../../services/OrderService.service";
import { ShoppingCardService } from "../../services/ShoppingCard.service";
import { UserService } from "../../services/UserService.service";

@Component({
    selector: 'CardDetails-selector',
    templateUrl: './CardDetails.component.html',
    styleUrls: ['./CardDetails.component.css']
})
export class CardDetailsComponent implements OnInit {
    products = this.cardService.getItems();
    totalPrice = this.cardService.getTotalPrice();
    currentUser!: User;
    showMessage = false;
    faDelete = faDeleteLeft;
    constructor(private cardService: ShoppingCardService, private router: Router, private orderService: OrderService, private userService: UserService) { }
    ngOnInit(): void {
        //kullanıcı girişi varsa currentUser a eşitler yoksa giriş ekranına yönlendirir.
        if (this.userService.isLogIn()) {
            this.currentUser = this.userService.getLocalStorage();
        } else {
            this.router.navigate(['./SignIn'])
        }
    }

    // sepetteki ürünü siler sayfadaki ürünleri ve toplam fiyatı günceller.
    deleteProduct(title: String) {
        console.log(title);
        this.products = this.cardService.deleteFromCard(title);
        this.totalPrice = this.cardService.getTotalPrice();
    }

    // ürünün adetini azaltır ve buna bağlı güncellemeleri yapar
    decreaseQuantity(item: ShoppingCardItem) {
        item.quantity--;
        this.products = this.cardService.updateItem(item);
        this.totalPrice = this.cardService.getTotalPrice();
    }
   
    // ürünün adetini artırır. ve buna bağlı güncellemeleri yapar
    increaseQuantity(item: ShoppingCardItem) {
        item.quantity++;
        this.products = this.cardService.updateItem(item);
        this.totalPrice = this.cardService.getTotalPrice();
    }

    // ana sayfaya yönlendirir.
    goHome() {
        this.router.navigate(['./Dashboard'])
    }

    // ürün detay sayfasına yönlendirir.
    goProductDetails(id: number) {
        this.router.navigate(['Product/Details', id])
    }

    // OrderService kullanarak orderi database e geçirir.
    setOrder() {
        let order = {
            user_id: this.currentUser.id,
            products: this.cardService.getProductIdQuantityList(),
            price: this.cardService.getTotalPrice()
        }
        this.orderService.addOrder(order).subscribe((res) => {
            console.log(res);
        });
        this.showMessage = true;
        this.messageTimer();
        setTimeout(() => {
        this.products = this.cardService.clearCart();
            
        }, 1000);
    }

    // ekrana çıkan işlem başarılı mesajını zamanlar.
    messageTimer() {
        setTimeout(() => {
            this.showMessage = false;
        }, 1000);
    }
}