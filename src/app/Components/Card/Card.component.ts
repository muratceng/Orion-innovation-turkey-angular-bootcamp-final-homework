import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ShoppingCardItem } from "src/app/models/ShoppingCardItem.model";
import { ShoppingCardService } from "src/app/services/ShoppingCard.service";


@Component({
    selector:"card-selector",
    templateUrl:"./Card.component.html",
    styleUrls:["./Card.component.css"]
})
export class CardComponent implements OnInit{

    constructor(private router:Router,private cardService:ShoppingCardService){}
    @Input() product:any;
    showMessage =false;
    ngOnInit(): void {
        
    }

    // ürün detay sayfasına yönderir.
    goDetails(){
        this.router.navigate(['Product/Details',this.product.id]);
    }

    //ShoppingCardService i kullanarak shopping carda item ekler
    addToCard(){
        let item= new ShoppingCardItem(this.product.title,this.product.price,1,this.product.id)
        this.cardService.addToCard(item);
        this.showMessage=true;
        this.messageTimer();
    }

    // Sepete eklendi mesajının kaybolması için kurulan timeout.
    messageTimer(){
        setTimeout(() => {
            this.showMessage=false;
        },1000);
    }
}