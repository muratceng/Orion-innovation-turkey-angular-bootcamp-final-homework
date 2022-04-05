import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:"Carousel-selector",
    templateUrl:"./Carousel.component.html",
    styleUrls:['./Carousel.component.css']
})
export class CarouselComponent implements OnInit{
    @Input() images:any;
    constructor(){}
    ngOnInit(): void {
        
    }

}