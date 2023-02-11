import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import{faCartArrowDown, faEye} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.product.trendyproduct().subscribe((res)=>{
      this.trendyproducts=res;
    })
  }
  trendyproducts:product[]|undefined;
  constructor(private product:ProductService){}
  view=faEye;
  cart=faCartArrowDown
}
