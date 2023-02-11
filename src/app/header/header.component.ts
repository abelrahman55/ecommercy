import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menutype:string='default';
  sellername:string|undefined;
  searchedproduct:product[]|undefined;
  username:string|undefined;
  cartdatalength=0;
  ngOnInit(): void {
    let cartdata=localStorage.getItem('localcart');
    if(cartdata){
      this.cartdatalength=JSON.parse(cartdata).length;
    }
    this.product.cartdata.subscribe((res)=>{
      this.cartdatalength=res.length;
    })
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellername=sellerData.name;
          this.menutype = 'seller';
        }
        else if(localStorage.getItem('user')){
          let user=localStorage.getItem('user');
          let userid=user&&JSON.parse(user)[0].id;
          this.product.getcartlist(userid);
          this.menutype='user';
          this.username=user&&JSON.parse(user)[0].name;
        }
        else{
          this.menutype='default'
          }
      }
    })
  }
  sellerlogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['seller-auth'])
  }
  constructor(private route:Router,private product:ProductService){

  }
  search(query:KeyboardEvent){
    if(query){
      let element=query.target as HTMLInputElement;
      this.product.searchproduct(element.value).subscribe((res)=>{
        console.log(res)
        if(res.length>5){
          res.length=5;
        }
        this.searchedproduct=res;
      })
    }
  }
  userlogout(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
  }
  bluresearch(){
    this.searchedproduct=undefined;
  }
  redirectToDetails(productid:number){
    this.route.navigate([`product-details/${productid}`]);
  }
  searchproducts(element:any){
    console.log(element)
    this.route.navigate([`searched-products/${element}`])
  }
}
