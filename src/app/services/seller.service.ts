import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { signup, login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  sellerstatus=new BehaviorSubject<boolean>(false);
  isloginerror=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }
  sellersignup(data:signup){
    return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((res)=>{
      if(res){
        localStorage.setItem('seller',JSON.stringify(res.body));
        this.route.navigate(['seller-home'])
        this.sellerstatus.next(true);
      }
    })
  }
  reloadseller(){
    if(localStorage.getItem('seller')){
      this.route.navigate(['seller-home']);
      this.sellerstatus.next(true);
    }
  }
  sellerlogin(data:login){
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>{
      if(res&&res.body&&res.body.length===1){
        localStorage.setItem('seller',JSON.stringify(res.body))
        this.route.navigate(['seller-home']);
        this.isloginerror.emit(false);
      }
      else{
        this.isloginerror.emit(true);
      }
    })
  }
}
