import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faDeleteLeft, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { ConfirmModalComponent } from 'src/app/Components/ConfirmModal/ConfirmModal.component';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router, private modal:NgbModal ) { }
  products!:Product[];
  fadelete = faDeleteLeft;
  faEdit = faEdit;
  faAdd = faAdd;
  faSearch= faSearch;
  @ViewChild('dt1') dt: Table | undefined;
  loading=true;

  ngOnInit(): void {
    this.productService.getProductList<Product[]>().subscribe((res)=>{
      this.products = res as Product[];
      this.loading=false;
    })
    console.log('oninit');
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  goAddProduct(){
    this.router.navigate(['AddProduct']);
  }

  goEdit(id:number){
    this.router.navigate(['EditProduct',id])
  }

  deleteProduct(id:string){
    this.modal.open(ConfirmModalComponent).result.then((res)=>{
      console.log(res);
      if(res=='Ok click'){
        this.productService.deleteProduct(id).subscribe((res)=>{
          this.ngOnInit();
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
      
  }
  

}
