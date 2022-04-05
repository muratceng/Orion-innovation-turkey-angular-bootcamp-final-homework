import { Injectable } from "@angular/core";
import { Product } from "../models/Product.model";
import { ShoppingCardItem } from "../models/ShoppingCardItem.model";

@Injectable({
    providedIn:"root"
})
export class ShoppingCardService{

    // shoppincarditemlerin bulunduğu products tanımlanmıştır. localstorageda ilgili bilgi varsa ordan çekilir yoksa boş liste.
    products:ShoppingCardItem[] = this.localStorageInfo() ? this.getLocalStorage() : [];

    /**
     * This function add ShoppingCardItem to list.
     * 
     * @param product 
     * @returns ShoppingCardItem list
     */
    addToCard(product:ShoppingCardItem){
        //flag ile bu itemin daha önceden eklenip eklenmediği kontrol edilmiştir.
        let flag=false;
        for(let i=0;i<this.products.length;i++){
            //listede daha önce varsa adeti artırılır.
            if(this.products[i].title == product.title){
                this.products[i].quantity++;
                flag=true;
            }
        }
        //daha önce eklenmemiş ise değişikliğe uğramadan listeye eklenir.
        if(!flag){
            this.products.push(product);
        }
        this.AddLocalStorage();
        return this.products;
    } 

    /**
     * This function update ShoppingCardıtem and set list.
     * 
     * @param item 
     * @returns ShoppingCardItem list
     */
    updateItem(item:ShoppingCardItem){
        for(let i=0;i<this.products.length;i++){
            if(this.products[i].title == item.title){
                this.products[i].quantity = item.quantity;
            }
        }
        this.AddLocalStorage();
        return this.products;
    }

    /**
     * This function delete ShoppingCardItem by title.
     * 
     * @param title 
     * @returns ShoppingCardItem list
     */
    deleteFromCard(title:String){
        this.products =this.products.filter((item)=> item.title !=title);
        this.AddLocalStorage();
        return this.products;
    }

    /**
     * This function create Object array and returns it
     * 
     * @returns Object array
     */
    getProductIdQuantityList(){
        let products=[];
        for(let i=0;i<this.products.length;i++){
            products.push({id:this.products[i].id, quantity:this.products[i].quantity});
        }
        return products;
    }
    
    /**
     * This function returns ShoppingCard
     * 
     * @returns list
     */
    getItems(){
        return this.products;

    }

    /**
     * This function clear the ShoppingCard
     * 
     * @returns 
     */
    clearCart(){
        this.products=[];
        localStorage.removeItem('shoppingCard');
        return this.products;
    }

    /**
     * This function add ShoppingCard to localstorage 
     */
    AddLocalStorage(){
        localStorage.setItem('shoppingCard',JSON.stringify(this.products))
    }
    
    // Local storageden currentUseri çeker eğer yoksa boş objeye eşitler.
    getLocalStorage(){
        return JSON.parse(localStorage.getItem('shoppingCard') || '{}') 
    }

    // getLocalStorage() den gelen objede name propertysi varsa true yoksa false döner.
    localStorageInfo(){
        return this.getLocalStorage().hasOwnProperty("0")==true
    }

    /**
     * This function calculate the total price for ShoppinCard and returns it. 
     * 
     * @returns number
     */
    getTotalPrice(){
        let price=0;
        for(let i =0; i<this.products.length;i++){
            price += this.products[i].price * this.products[i].quantity;
        }
        return price;
    }
    
}
