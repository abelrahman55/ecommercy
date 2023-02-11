import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.css']
})
export class SearchedProductsComponent implements OnInit{
  searchedproducts:product[]|undefined;
  ngOnInit(): void {
    let cat=this.route.snapshot.paramMap.get('cat');
    cat&&this.product.searchproduct(cat).subscribe((res)=>{
      this.searchedproducts=res;
    })
  }
  constructor(private product:ProductService,private route:ActivatedRoute){}
}
