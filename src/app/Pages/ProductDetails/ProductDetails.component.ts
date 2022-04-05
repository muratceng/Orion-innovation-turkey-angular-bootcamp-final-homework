import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCardItem } from 'src/app/models/ShoppingCardItem.model';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/UserService.service';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/ProductService.service';
import { ShoppingCardService } from '../../services/ShoppingCard.service';

@Component({
  selector: 'product-details-selector',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  currentImage!: String;
  currentUser !: User;
  showMessage = false;
  constructor(private productService: ProductService, private route: Router, private router: ActivatedRoute, private cardService: ShoppingCardService, private userService: UserService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.router.snapshot.params['id']).subscribe((res) => {

      this.product = res as Product
    },(err)=>{
      this.route.navigate(['./Dashboard']);
    })

    //kullanıcı girişi varsa currentUser a eşitler yoksa giriş ekranına yönlendirir.
    if (this.userService.isLogIn()) {
      this.currentUser = this.userService.getLocalStorage();
    } else {
      this.route.navigate(['./SignIn'])
    }
  }

  // ürün sepetine item ekler
  addToCard() {
    let item = new ShoppingCardItem(this.product.title,this.product.price,1, this.product.id)
    this.cardService.addToCard(item);
    this.showMessage = true;
    this.messageTimer();
  }

  // Mesajın süresini zamanlar.
  messageTimer() {
    setTimeout(() => {
      this.showMessage = false;
    }, 1000);
  }

}
