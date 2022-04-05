import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'NotFound-selector',
    templateUrl:'./NotFound.component.html',
    styleUrls:['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit{

    constructor(private router:Router){}
    ngOnInit(): void {
        
    }

    goHome(){
        this.router.navigate(['./Dashboard'])
    }

}