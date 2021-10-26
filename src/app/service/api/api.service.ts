import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseurl = environment.url + 'api/';
  orderselected: any;
  table: any;
  coupon: any;
  category: any;
  menuitem: any;
  restaurant: any;
  status: any;
  currentuser: any;
  currentrole: any;

  constructor(
    private http: HttpClient
  ) { }

  adminLogin(data) {
    return this.http.post(this.baseurl + 'adminLogin', data, {})
  }

  listStores() {
    return this.http.get(this.baseurl + 'listStores', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listOrders(data) {
    return this.http.post(this.baseurl + 'listOrders', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listEntries(data) {
    return this.http.post(this.baseurl + 'listEntries', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listProduct(data) {
    return this.http.post(this.baseurl + 'listProduct', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listStockEntries(data) {
    return this.http.post(this.baseurl + 'listStockEntries', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

}