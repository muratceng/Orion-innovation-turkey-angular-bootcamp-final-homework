import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector:"ConfirmModal-selector",
    templateUrl:"./ConfirmModal.component.html",
})
export class ConfirmModalComponent implements OnInit{
    constructor(public modal:NgbActiveModal){}
    ngOnInit(): void {
        
    }

}