import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup;
  maincategory:String[]=['Choose a main category','Electronic','HomeandFurniture','Cosmetic','Sport','Clothes'];
  images:String[]=[''];
  faAdd = faAdd;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.addProductForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        shortdescription: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        images: this.formBuilder.array(
          this.images.map((x)=>this.formBuilder.control(x))
        ),
        price: new FormControl(null, [Validators.required]),
        maincategory: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
    });
}

  onSubmit(){
    console.log('tıklandı')
    this.images=this.addProductForm.get('images')?.value;
    console.log(this.images);
  }

  addImages(){
    this.images.push('');
    this.createForm();
  }

  removeImages(){
    if(this.images.length>1){
      this.images.pop();
      this.createForm();
    }
  }
}
