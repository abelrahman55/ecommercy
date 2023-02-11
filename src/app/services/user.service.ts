import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signup, login } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginerror=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private route:Router) { }
  usersignup(data:signup){
    return this.http.post('http://localhost:3000/user',data,{observe:'response'}).subscribe((res)=>{
      if(res&&res.body){
        localStorage.setItem('user',JSON.stringify([res.body]));
        this.route.navigate(['/']);
      }
    })
  }
  userlogin(data:login){
    return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>{
      if(res&&res.body&&res.body.length===1){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.route.navigate(['/']);
        this.loginerror.emit(false);
      }
      else{
        this.loginerror.emit(true);
      }
  })
  }
  reloaduser(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/']);
    }
  }
}
