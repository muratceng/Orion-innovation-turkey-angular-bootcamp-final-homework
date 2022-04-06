import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup;
  maincategory:String[]=['Choose a main category','Electronic','HomeandFurniture','Cosmetic','Sport','Clothes'];

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.addProductForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        shortdescription: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        images: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        maincategory: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
    });
}

  onSubmit(){
    console.log('tıklandı')
  }

}
