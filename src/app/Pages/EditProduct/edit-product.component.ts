import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product!:Product;
  editProductForm!:FormGroup;
  categories = [{ mainCategory:"Electronic", subCategories: ['Television', 'Laptop', 'Playstation'] },
    { mainCategory:"HomeandFurniture",  subCategories:['Furniture', 'Dinner set', 'Lamp'] },
    { mainCategory:"Cosmetic", subCategories: ['Shampoo', 'Perfume', 'Lipgloss'] },
    { mainCategory:"Sport", subCategories: ['Bike', 'Skateboard', 'Dumbbell'] },
    { mainCategory:"Clothes", subCategories: ['Jacket', 'Pants', 'T-shirt'] }];
  subCategories:String[]=[];
  categoryError='';
  faDelete= faRemove;
  faAdd = faAdd;

  constructor(private activatedRouter:ActivatedRoute, private router:Router, private productService:ProductService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.productService.getProductById(this.activatedRouter.snapshot.params['id']).subscribe((res) => {

      this.product = res as Product
      this.fetchValue();
    },(err)=>{
      this.router.navigate(['./AdminProducts']);
    })
    
  }

  //FormGroup oluşturma fonksiyonu.
  createForm(){
    this.editProductForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        shortdescription: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        images: this.formBuilder.array([] ),
        price: new FormControl(null, [Validators.required]),
        maincategory: new FormControl(null),
        category: new FormControl(null),
    });
  }

  //Databaseden gelen product bilgilerini form değerlerine eşitler.
  fetchValue(){
    this.editProductForm.get('title')?.setValue(this.product.title);
    this.editProductForm.get('shortdescription')?.setValue(this.product.shortdescription);
    this.editProductForm.get('description')?.setValue(this.product.description);
    this.editProductForm.get('price')?.setValue(this.product.price);

    this.getSubCategories(this.product.maincategory);
    for(let i=0;i<this.product.images.length;i++){
      this.addImages(this.product.images[i])
    }
  }

  //Dinamik FormArray oluşturmak için kullanılmıştır. FormGroup döner.
  createImageFormGroup(value:string): FormGroup{
    return new FormGroup({
      'image': new FormControl(value),
    })
  }

  //Admin sayfasına yönlendirir.
  goBack(){
    this.router.navigate(['AdminProducts']);
  }

  //Seçilen ana kategoriye göre alt kategorileri eşitler.
  getSubCategories(val:string){
    let category = this.categories.find((item)=>val==item.mainCategory)
    if(category?.subCategories){
      this.subCategories = category?.subCategories;
    }else{
      this.subCategories=[];
    }
    
  }

  //Htmlde kullanılması üzere images FormArrayinin controls'ünü döner.
  getControls(){
    return (this.editProductForm.get('images') as FormArray).controls;
  }

  //yeni bir formgroup oluşturup onu FormArraya atar.
  addImages(value:string){
    const images = this.editProductForm.get('images') as FormArray
    images.push(this.createImageFormGroup(value))
  }

  //Bu sayfadaki product değişkenin images dizisini images FormArrayine Ekler.
  initialAddImages(){
    const images = this.editProductForm.get('images') as FormArray
    for(let i=0;i<this.product.images.length;i++){
      images.push(this.createImageFormGroup(this.product.images[i]))
    }
  }

  //images FormArrayindeki son itemi siler.
  removeImages(){
    const images = this.editProductForm.get('images') as FormArray
      if (images.length > 1) {
        images.removeAt(images.length-1)
      } 
  }

  //Formdan gelen değerleri product değişkenine atar ve onu put yaparak database i günceller.
  onSubmit(){
    if(this.editProductForm.get('category')?.value == 'Choose a category'){
      this.categoryError='You should choose category properly';
    }
    else{
      let imageArray=[];
      const formArray = this.editProductForm.get('images') as FormArray;
      const images=formArray.controls['0'].value;
  
      for(let i=0;i<formArray.length;i++){
        imageArray.push(formArray.controls[i].get('image')?.value);
      }
  
      const product ={
        title:this.editProductForm.get('title')?.value,
        shortdescription:this.editProductForm.get('shortdescription')?.value,
        description:this.editProductForm.get('description')?.value,
        images:imageArray,
        price:this.editProductForm.get('price')?.value,
        maincategory:this.editProductForm.get('maincategory')?.value ? this.editProductForm.get('maincategory')?.value :this.product.maincategory,
        category:this.editProductForm.get('category')?.value ? this.editProductForm.get('category')?.value : this.product.category
      }
      console.log(product)
       this.productService.updateProduct(product,this.product.id.toString()).subscribe((res)=>{
      });
      this.editProductForm.reset();
      this.router.navigate(['AdminProducts']);
    }
  }

  //Eğer sayfada kaydedilmemiş değişiklik var ise onaylama sorusu çıkarır.
  canExit():boolean{
    if (this.editProductForm.dirty && !this.editProductForm.pristine) {
      if (confirm('You have unsaved changes! Do you want to continue')) {
        return true;
      }
      return false;
    }
    return true;
  }

}
