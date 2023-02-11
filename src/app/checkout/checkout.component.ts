import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, order, product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalprice: number | undefined;
  cartdata: cart[] | undefined;
  ordermsg: string | undefined;
  ngOnInit(): void {
    this.reloadcartdata();
  }
  reloadcartdata() {
    this.product.currentCart().subscribe((res) => {
      if (res) {
        let price = 0;
        this.cartdata = res;
        res.forEach((item) => {
          if (item.quantity) {
            price += +item.price * +item.quantity;
          }
        });
        this.totalprice = price + price / 10 + 100 - price / 10;
      }
    });
  }
  ordernow(data: { email: string; address: string; contact: string }) {
    if (this.totalprice) {
      let user = localStorage.getItem('user');
      let userid = user && JSON.parse(user)[0].id;
      let orderdata: order = {
        ...data,
        totalprice: this.totalprice,
        userid,
        id: undefined,
      };
      this.product.ordernow(orderdata).subscribe((res) => {
        alert('products has added to your ordered');
        this.cartdata?.forEach((item) => {
          setTimeout(() => {
            item.id && this.product.deletecartitems(item.id);
          }, 700);
        });
        if (res) {
          this.ordermsg = 'order has been placed';
          setTimeout(() => {
            this.ordermsg = undefined;
          }, 4000);
          this.route.navigate(['/orders']);
        }
      });
    }
  }
  constructor(private product: ProductService, private route: Router) {}
}
