import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/Order.model";

@Injectable({
    providedIn:"root"
})
export class OrderService{
    constructor(private http:HttpClient){}

    //orders tablosuna order ekleme işlemi yapar.
    /**
     * This function post order to database.
     * 
     * @param order it should be order.model type without id.
     */
    addOrder<T>(order:any):Observable<T>{
        return this.http.post<T>("http://localhost:3000/orders",order)
    }
}