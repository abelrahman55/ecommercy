import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { signup, login } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  loginerrormsg:string|undefined;
  ngOnInit(): void {
    this.seller.reloadseller();
  }
  logsignstatus:boolean=false;
  constructor(private seller:SellerService,private formbuilder:FormBuilder){
    this.sellerform=this.formbuilder.group({
      name:[''],
      email:[''],
      password:[''],
    })
  }
  sellerform:any;
  changelogsign(){
    this.logsignstatus=!this.logsignstatus
  }
  signup(data:signup){
  console.log(data)
  this.seller.sellersignup(data);
  }
  login(data:login){
    this.seller.sellerlogin(data);
    this.seller.isloginerror.subscribe((error)=>{
      if(error){
        this.loginerrormsg='password or email is error';
      }
      else{
        this.loginerrormsg=undefined;
      }
    })
  }
}
