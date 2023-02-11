import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  orders:order[]|undefined;
  ngOnInit(): void {
    this.reloadorder();
  }
    reloadorder(){
    this.product.orderlist().subscribe((res)=>{
      this.orders=res;
    })
  }
  cancelorder(id:number|undefined){
    this.product.cancleorder(id).subscribe((res)=>{
      alert('order has cancled');
      this.reloadorder();
    })
  }
  constructor(private product:ProductService){}
}
