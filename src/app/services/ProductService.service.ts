import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const BASE_API="http://localhost:3000/products";

@Injectable({
    providedIn:"root"
})
export class ProductService{
    constructor(private http:HttpClient){}


    /**
     * This function return productlist from database
     * 
     * @returns Observable
     */
    getProductList<T>():Observable<T> {
        return this.http.get<T>(BASE_API)
    }
    
    /**
     * This function return product by id from database
     * 
     * @param id product id
     * @returns Observable
     */
    getProductById<T>(id:String):Observable<T>{
        return this.http.get<T>(BASE_API+"/"+id);
    }

    /**
     * This function return filtered list by main category from database
     * 
     * @param filterText filterText for maincategory.
     * @returns 
     */
    filterByMainCategory<T>(filterText:string):Observable<T>{
        return this.http.get<T>(BASE_API+"?maincategory="+filterText)
    }

    /**
     * This function return filtered list by category from database
     * 
     * @param filterText filterTExt for category
     * @returns 
     */
    filterBySubCategory<T>(filterText:string):Observable<T>{
        return this.http.get<T>(BASE_API+"?category="+filterText)
    }

    /**
     * This function return filtered list by title from database
     * 
     * @param filterText filterText for title
     * @returns 
     */
    filterByName<T>(filterText:string):Observable<T>{
        return this.http.get<T>(BASE_API+"?title_like="+filterText)
    }
}