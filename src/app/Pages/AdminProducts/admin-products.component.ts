import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
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

  ngOnInit(): void {
    this.productService.getProductList<Product[]>().subscribe((res)=>{
      this.products = res as Product[];
    })
  }

}
