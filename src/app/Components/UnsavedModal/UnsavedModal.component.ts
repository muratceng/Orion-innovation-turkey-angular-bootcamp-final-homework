import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector:"UnSavedModal-selector",
    templateUrl:"./UnsavedModal.component.html",
})
export class UnSavedModalComponent implements OnInit{
    constructor(public modal:NgbActiveModal){}
    ngOnInit(): void {
        
    }

}