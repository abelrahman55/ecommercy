import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { signup, login, product,cart} from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  ngOnInit(): void {
    this.user.reloaduser();
  }
  constructor(private formbuilder:FormBuilder,private user:UserService,private product:ProductService){
    this.userform=this.formbuilder.group({
      name:[''],
      email:[''],
      password:[''],
    })
  }
  userform:any;
  loginerrormsg:string|undefined;
  logsign:boolean=false;
  changelogsign(){
    this.logsign=!this.logsign;
  }
  signup(data:signup){
    this.user.usersignup(data);
  }
  login(data:login){
    this.user.userlogin(data);
    this.user.loginerror.subscribe((error)=>{
      if(error){
        this.loginerrormsg='the password or email is error';
      }
      else{
        this.loginerrormsg='';
        this.getproductfromlocal();
      }
      setTimeout(() => {
        this.loginerrormsg=undefined
      }, 3000);
    })
  }

  getproductfromlocal(){
    let localcart=localStorage.getItem('localcart');
    let user=localStorage.getItem('user');
    let userid=user&&JSON.parse(user)[0].id;
    if(localcart){
      let cartdata:product[]=JSON.parse(localcart);
      cartdata.forEach((item:product,index)=>{
      let prodcart:cart={
          ...item,
          userid,
          productid:item.id,
        }
        delete prodcart.id;
        setTimeout(() => {
          this.product.addtocart(prodcart).subscribe((res)=>{
            if(res){
              console.log('product has added to database');
            }
          })
        }, 500);
        if(cartdata.length===index+1){
          localStorage.removeItem('localcart');
        }
        setTimeout(() => {
          this.product.getcartlist(userid);
        }, 20000);
      })
    }
  }
}
