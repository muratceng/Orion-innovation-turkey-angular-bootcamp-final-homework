import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/ProductService.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product!:Product;

  constructor(private activatedRouter:ActivatedRoute, private router:Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.activatedRouter.snapshot.params['id']).subscribe((res) => {

      this.product = res as Product
    },(err)=>{
      this.router.navigate(['./AdminProducts']);
    })
  }

}
