import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup;
  Electronic:String[]=[]
  faAdd = faAdd;
  faDelete = faRemove;
  categories = [{ mainCategory:"Electronic", subCategories: ['Television', 'Laptop', 'Playstation'] },
    { mainCategory:"HomeandFurniture",  subCategories:['Furniture', 'Dinner set', 'Lamp'] },
    { mainCategory:"Cosmetic", subCategories: ['Shampoo', 'Perfume', 'Lipgloss'] },
    { mainCategory:"Sport", subCategories: ['Bike', 'Skateboard', 'Dumbbell'] },
    { mainCategory:"Clothes", subCategories: ['Jacket', 'Pants', 'T-shirt'] }];
  subCategories:String[]=[];
  categoryError='';


  constructor(private formBuilder:FormBuilder,private productService:ProductService, private router:Router) { }

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
    if(this.addProductForm.get('category')?.value == 'Choose a category'){
      this.categoryError='You should choose category properly';
    }
    else{
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
      this.productService.addProduct(product).subscribe((res)=>{
      });
      this.addProductForm.reset();
      this.router.navigate(['AdminProducts']);
    }
    
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

  goBack(){
    this.router.navigate(['AdminProducts']);
  }

  getSubCategories(val:string){
    let category = this.categories.find((item)=>val==item.mainCategory)
    console.log(category?.subCategories);
    if(category?.subCategories){
      this.subCategories = category?.subCategories;
    }else{
      this.subCategories=[];
    }
    
  }
}
