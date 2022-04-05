import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { Observable} from 'rxjs';

// json-server lokasyonu
const BASE_API="http://localhost:3000/user"

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http:HttpClient){}
    
    // Local storageden currentUseri çeker eğer yoksa boş objeye eşitler.
    /**
     * This function pulls currentUser from local storage, otherwise syncs to empty object.
     * 
     * @returns Object
     */
    getLocalStorage(){
        return JSON.parse(localStorage.getItem('currentUser') || '{}') 
    }

    /**
     * If the object from getLocalStorage() has a name property, it returns true, otherwise false.
     * 
     * @returns boolean
     */
    isLogIn(){
        return this.getLocalStorage().hasOwnProperty("name")==true
    }

    /**
     * This function returns user list.
     * 
     * @returns Observable
     */
    getUserList<T>():Observable<T>{
        return this.http.get<T>(BASE_API)
    }
    
    /**
     * This functions add user to database
     * 
     * @param user 
     * @returns Observable
     */
    addUser<T>(user:any):Observable<T>{
        return this.http.post<T>(BASE_API,user)
    }

    /**
     * Writes the user to localstorage.
     * 
     * @param user 
     */
    writeLocalStorage(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}