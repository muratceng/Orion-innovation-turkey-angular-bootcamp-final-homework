import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup;
  maincategory:String[]=['Electronic','HomeandFurniture','Cosmetic','Sport','Clothes'];
  faAdd = faAdd;
  faDelete = faRemove;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.addProductForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        shortdescription: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        images: this.formBuilder.array([this.createImageFormGroup()] ),
        price: new FormControl(null, [Validators.required]),
        maincategory: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
    });
  }

  createImageFormGroup(): FormGroup{
    return new FormGroup({
      'image': new FormControl(''),
    })
  }

  onSubmit(){
    let imageArray=[];
    const formArray = this.addProductForm.get('images') as FormArray;
    const images=formArray.controls['0'].value;

    for(let i=0;i<formArray.length;i++){
      imageArray.push(formArray.controls[i].get('image')?.value);
    }

    const product ={
      title:this.addProductForm.get('title')?.value,
      shortdescription:this.addProductForm.get('shortdescription')?.value,
      description:this.addProductForm.get('description')?.value,
      images:imageArray,
      price:this.addProductForm.get('price')?.value,
      maincategory:this.addProductForm.get('maincategory')?.value,
      category:this.addProductForm.get('category')?.value
    }
    console.log(product);
    this.addProductForm.reset();
  }

  addImages(){
    const images = this.addProductForm.get('images') as FormArray
    images.push(this.createImageFormGroup())
  }

  removeImages(){
    const images = this.addProductForm.get('images') as FormArray
      if (images.length > 1) {
        images.removeAt(images.length-1)
      } 
  }

  getControls(){
    return (this.addProductForm.get('images') as FormArray).controls;
  }
}
