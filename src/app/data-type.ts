export interface signup{
  name:string;
  email:string;
  password:string|number;
}
export interface login{
  email:string;
  password:string|number;
}

export interface product{
  name:string,
  price:number,
  category:string;
  color:string,
  image:string,
  description:string,
  id:number,
  quantity:number|undefined;
  productid:undefined|number,
}
export interface cart{
  name:string,
  price:number,
  category:string;
  color:string,
  image:string,
  description:string,
  id:number|undefined,
  quantity:number|undefined,
  productid:number,
  userid:number,
}
export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalprice:number,
  userid:string,
  id:number|undefined
}
