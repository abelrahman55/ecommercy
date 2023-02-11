import { Component, OnInit } from '@angular/core';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  deleteproductmsg:string|undefined;
  sellerproducts:undefined|product[];
  ngOnInit(): void {
    this.reloadproduct();
  }
  constructor(private product:ProductService){}
  icon=faTrash;
  iconedit=faEdit;
  deletethisproduct(productid:number){
    this.product.deleteproduct(productid).subscribe((res)=>{
      if(res){
        this.deleteproductmsg='the product has deleted';
        this.reloadproduct();
      };
      setTimeout(() => {
        this.deleteproductmsg=undefined;
      }, 3000);
    })
  }
  reloadproduct(){
    this.product.getproduct().subscribe((res)=>{
      this.sellerproducts=res;
    })
  }
}
