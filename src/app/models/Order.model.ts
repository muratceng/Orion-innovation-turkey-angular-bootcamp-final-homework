export class Order{
   id:number;
   user_id:number;
   products:[{id:number,quantity:number}];
   price:number;
   
   constructor(id:number, user_id:number,products:[{id:number,quantity:number}],price:number){
       this.id=id;
       this.user_id=user_id;
       this.products=products;
       this.price=price;
   }
}