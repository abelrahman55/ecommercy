import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addproductmsg:string|undefined;
  constructor(private formbuilder:FormBuilder,private product:ProductService){
    this.productform=this.formbuilder.group({
      name:[''],
      category:[''],
      price:[''],
      color:[''],
      description:[''],
      image:[''],
    })
  }
  productform:any
  addprouct(data:product){
    this.product.addproduct(data).subscribe((res)=>{
      if(res){
        this.addproductmsg='the product has added';
      };
      setTimeout(() => {
        this.addproductmsg=undefined;
      }, 3000);
    })
  }
}
