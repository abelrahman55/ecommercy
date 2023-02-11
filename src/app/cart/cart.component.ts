import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartdata:cart[]|undefined;
  summaryprice:priceSummary={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  ngOnInit(): void {
    this.loadcartdata();
  }
  loadcartdata(){
    this.product.currentCart().subscribe((res)=>{
      this.cartdata=res;
      let price=0;
      res.forEach((item)=>{
        if(item.quantity){
          price=price +(+item.price * +item.quantity)
        }
      })
      this.summaryprice.price = price;
      this.summaryprice.discount = price / 10;
      this.summaryprice.tax = price / 10;
      this.summaryprice.delivery = 100;
      this.summaryprice.total = price + (price / 10) + 100 - (price / 10);
      if(!this.cartdata.length){
        this.router.navigate(['/'])
      }
    })
  }

  removeToCart(cartId:number|undefined){
    cartId && this.cartdata && this.product.removefromcart(cartId)
    .subscribe((result)=>{
      this.loadcartdata();
    })
  }
  checkout(){
    this.router.navigate(['checkout'])
  }
  constructor(private product:ProductService,private router:Router){}
}
