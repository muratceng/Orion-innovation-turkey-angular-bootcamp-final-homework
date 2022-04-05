export class ShoppingCardItem{
    title:String;
    price:number;
    quantity:number;
    id:number;

    constructor(title:String,price:number,quantity:number,id:number){
        this.title=title;
        this.price=price;
        this.quantity=quantity;
        this.id=id;
    }
}