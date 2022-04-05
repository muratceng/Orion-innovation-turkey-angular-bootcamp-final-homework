export class Product{
    id:number;
    title:string;
    shortdescription:string;
    description:string;
    images:string[];
    price:number;
    mainCategory:string;
    category:string;

    constructor(id:number,title:string,shortdescription:string,description:string,images:string[],price:number,mainCategory:string,category:string){
        this.id=id;
        this.title=title;
        this.shortdescription=shortdescription;
        this.description=description;
        this.images=images;
        this.price=price;
        this.mainCategory=mainCategory;
        this.category=category;
    }
}