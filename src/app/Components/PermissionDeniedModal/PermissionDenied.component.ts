import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector:"PermissionDeniedModal-selector",
    templateUrl:"./PermissionDenied.component.html",
})
export class PermissionDeniedModalComponent implements OnInit{
    constructor(public modal:NgbActiveModal){}
    ngOnInit(): void {
        
    }

}