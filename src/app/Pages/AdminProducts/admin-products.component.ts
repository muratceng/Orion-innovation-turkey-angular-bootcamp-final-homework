import { Component, OnInit, ViewChild } from '@angular/core';
import { faAdd, faDeleteLeft, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private productService:ProductService) { }
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
  }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
