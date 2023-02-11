import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  updateproductmsg:string|undefined;
  productdata:product|undefined;
  ngOnInit(): void {
    let productid= this.route.snapshot.paramMap.get('productid');
    productid&&this.product.getproductbyid(productid).subscribe((data)=>{
      this.productdata=data;
    });
  }
  constructor(private route:ActivatedRoute,private product:ProductService,private formbuilder:FormBuilder,private router:Router){
    this.productform=this.formbuilder.group({
      name:[''],
      price:[''],
      color:[''],
      description:[''],
      image:[''],
      category:[''],
    })
  }
  productform:any;
  updateproduct(data:product){
    if(this.productdata){
      data.id=this.productdata.id;
    }
    this.product.updateproduct(data).subscribe((res)=>{
      if(res){
        this.updateproductmsg='product has updated';
        this.router.navigate(['seller-home']);
      };
      setTimeout(() => {
        this.updateproductmsg=undefined;
      }, 3000);
    })
  }
}
