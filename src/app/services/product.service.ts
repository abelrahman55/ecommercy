import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product, cart, order } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartdata = new EventEmitter<product[]>();
  constructor(private http: HttpClient) {}
  getproduct() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  addproduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  deleteproduct(productid: number) {
    return this.http.delete(`http://localhost:3000/products/${productid}`);
  }
  getproductbyid(productid: string) {
    return this.http.get<product>(
      `http://localhost:3000/products/${productid}`
    );
  }
  updateproduct(data: product) {
    return this.http.put(`http://localhost:3000/products/${data.id}`, data);
  }
  trendyproduct() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=10`);
  }
  searchproduct(element: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${element}`
    );
  }
  localaddtocart(data: product) {
    let localcart = localStorage.getItem('localcart');
    let cartdata = [];
    if (!localcart) {
      cartdata.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartdata));
      this.cartdata.emit(cartdata);
    } else {
      cartdata = JSON.parse(localcart);
      cartdata.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartdata));
      this.cartdata.emit(cartdata);
    }
  }
  removetocart(productid: number) {
    let localcart = localStorage.getItem('localcart');
    if (localcart) {
      let items: product[] = JSON.parse(localcart);
      items = items.filter((item: product) => productid !== item.id);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartdata.emit(items);
    }
  }
  addtocart(data: cart) {
    return this.http.post('http://localhost:3000/cart', data);
  }
  /*   getcartlist(userid:number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userid=${userid}`,{observe:'response'}).subscribe((res:any)=>{
      if(res&&res.body){
        this.cartdata.emit(res);
      }
    })
  } */
  getcartlist(userid: number) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userid=${userid}`, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.cartdata.emit(res.body);
        }
      });
  }
  removefromcart(productid: number) {
    return this.http.delete(`http://localhost:3000/cart/${productid}`);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }
  ordernow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderlist() {
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user)[0].id;
    return this.http.get<order[]>(
      `http://localhost:3000/orders?userid=${userid}`
    );
  }
  deletecartitems(cartid: number) {
    return this.http
      .delete(`http://localhost:3000/cart/${cartid}`)
      .subscribe((res) => {
        this.cartdata.emit([]);
      });
  }
  cancleorder(id: number | undefined) {
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user)[0].id;
    return this.http.delete(`http://localhost:3000/orders/${id}`);
  }
}
