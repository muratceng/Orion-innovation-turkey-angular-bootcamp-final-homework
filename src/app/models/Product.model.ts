export class Product{
    id:number;
    title:string;
    shortdescription:string;
    description:string;
    images:string[];
    price:number;
    maincategory:string;
    category:string;

    constructor(id:number,title:string,shortdescription:string,description:string,images:string[],price:number,maincategory:string,category:string){
        this.id=id;
        this.title=title;
        this.shortdescription=shortdescription;
        this.description=description;
        this.images=images;
        this.price=price;
        this.maincategory=maincategory;
        this.category=category;
    }
}