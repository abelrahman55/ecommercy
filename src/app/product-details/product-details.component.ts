import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productdata:product|undefined;
  addstatus:boolean=false;
  productquantity:number=1;
  deletedcartdata:product|undefined;
  ngOnInit(): void {
    let localcart=localStorage.getItem('localcart');
    if(localcart){
      let items=JSON.parse(localcart);
      this.product.cartdata.emit(items);
    }
    let productid=this.router.snapshot.paramMap.get('productid');
    productid&&this.product.getproductbyid(productid).subscribe((res)=>{
      this.productdata=res;
    })
/*     let cartdata=localcart&&JSON.parse(localcart);*/
    let cartdata=localStorage.getItem('localcart');
    if(productid&&cartdata){
      let items=JSON.parse(cartdata);
      items=items.filter((item:product)=>productid===item.id.toString())
      if(items.length){
        this.addstatus=true;
      }
      else{
        this.addstatus=false;
      }
    }
    let user=localStorage.getItem('user');
    if(user){
      let userid=user&&JSON.parse(user)[0].id;
      this.product.getcartlist(userid);
      this.product.cartdata.subscribe((res)=>{
        let items=res.filter((item:product)=>productid?.toString()===item.productid?.toString())
        if(items.length){
          this.deletedcartdata=items[0];
          this.addstatus=true;
        }
      })
    }

  }
  addtocart(){
    this.addstatus=true;
    if(this.productdata){
      this.productdata.quantity=this.productquantity;
      if(!localStorage.getItem('user')){
        this.product.localaddtocart(this.productdata);
      }
      else{
        let user=localStorage.getItem('user');
        let userid=user&&JSON.parse(user)[0].id;
        let cartproduct:cart={
          ...this.productdata,
          productid:this.productdata.id,
          userid,
        }
        delete cartproduct.id;
        this.product.addtocart(cartproduct).subscribe((res)=>{
          this.product.getcartlist(userid);
        })
      }
    }
  }
  removetocart(productid:number){
    this.addstatus=false;
    if(!localStorage.getItem('user')){
      this.product.removetocart(productid)
    }
    else{
      this.deletedcartdata&&this.product.removefromcart(this.deletedcartdata.id).subscribe((res)=>{
        let user=localStorage.getItem('user');
        let userid=user&&JSON.parse(user)[0].id;
        this.product.getcartlist(userid)
      })
    }
  }
  changequantity(opr:string){
    if(this.productquantity<20 && opr==='plus'){
      this.productquantity+=1;
    }else if(this.productquantity>1 && opr==='min'){
      this.productquantity-=1;
    }
  }
  constructor(private router:ActivatedRoute,private product:ProductService){}
}
