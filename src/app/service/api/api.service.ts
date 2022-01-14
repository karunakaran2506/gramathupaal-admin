import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseurl = environment.url + 'api/';
  stockSelected: any;
  customerSelected: any;
  orderselected: any;
  productSelected: any;
  userSelected: any;
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

  adminLogin(data: any) {
    return this.http.post(this.baseurl + 'adminLogin', data, {})
  }

  viewUsers(data: any) {
    return this.http.post(this.baseurl + 'viewUsers', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  deleteUser(data: any) {
    return this.http.post(this.baseurl + 'deleteUser', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewUserDetails(data: any) {
    return this.http.post(this.baseurl + 'viewUserDetails', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  userSignup(data: any) {
    return this.http.post(this.baseurl + 'userSignup', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  userSignupWithImage(data: any) {
    return this.http.post(this.baseurl + 'userSignupWithImage', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  editUser(data: any) {
    return this.http.post(this.baseurl + 'editUser', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  editUserWithoutImage(data: any) {
    return this.http.post(this.baseurl + 'editUserWithoutImage', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listStores() {
    return this.http.get(this.baseurl + 'listStores', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listOrders(data: any) {
    return this.http.post(this.baseurl + 'listOrdersbyDate', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listEntries(data: any) {
    return this.http.post(this.baseurl + 'listEntries', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listCategory(data: any) {
    return this.http.post(this.baseurl + 'listCategory', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listProduct(data: any) {
    return this.http.post(this.baseurl + 'listProduct', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listStockEntries(data: any) {
    return this.http.post(this.baseurl + 'listAllStockEntries', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listTodayStockBalance(data: any) {
    return this.http.post(this.baseurl + 'listTodayStockBalance', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listStockEntriesbyProduct(data: any) {
    return this.http.post(this.baseurl + 'listStockEntriesByProduct', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listTodayStockEntries(data: any) {
    return this.http.post(this.baseurl + 'listTodayStockEntries', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listStockEntriesByDate(data: any) {
    return this.http.post(this.baseurl + 'listStockEntriesByDate', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  todayOrders(data: any) {
    return this.http.post(this.baseurl + 'todayOrders', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  addProduct(data: any) {
    return this.http.post(this.baseurl + 'createProduct', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  editProduct(data: any) {
    return this.http.post(this.baseurl + 'editProduct', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  editProductwithoutImage(data: any) {
    return this.http.post(this.baseurl + 'editProductwithoutImage', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  addcategory(data: any) {
    return this.http.post(this.baseurl + 'createCategory', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  saveStockEntry(data: any) {
    return this.http.post(this.baseurl + 'saveStockEntry', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  saveCostEntry(data: any) {
    return this.http.post(this.baseurl + 'saveCostEntry', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  dashboarDetails() {
    return this.http.get(this.baseurl + 'dashboarDetails', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewUserPastSales(data: any) {
    return this.http.post(this.baseurl + 'viewUserPastSales', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewUserPastSessions(data: any) {
    return this.http.post(this.baseurl + 'viewUserPastSessions', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  todayOrderDetails(data: any) {
    return this.http.post(this.baseurl + 'todayOrderDetails', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  datewiseOrderDetails(data: any) {
    return this.http.post(this.baseurl + 'datewiseOrderDetails', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  createMilkcard(data: any) {
    return this.http.post(this.baseurl + 'createMilkcard', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listMilkcard() {
    return this.http.get(this.baseurl + 'listMilkcard', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewCustomerbyStore(store) {
    return this.http.get(this.baseurl + 'viewCustomerbyStore', {
      headers: {
        token: localStorage.getItem('token'),
        store
      }
    })
  }

  listOrdersbyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listOrdersbyCustomer', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listProductTokenbyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listProductTokenbyCustomer', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listMilkcardEntrybyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listMilkcardEntrybyCustomer', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  overallTodayOrderDetails() {
    return this.http.get(this.baseurl + 'overallTodayOrderDetails', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listMilkcardHistorybyStore(data: any) {
    return this.http.post(this.baseurl + 'listMilkcardHistorybyStore', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listTokenHistorybyStore(data: any) {
    return this.http.post(this.baseurl + 'listTokenHistorybyStore', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  createSubscriptionpack(data: any) {
    return this.http.post(this.baseurl + 'createSubscriptionpack', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listSubscriptionpack() {
    return this.http.get(this.baseurl + 'listSubscriptionpack', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  createSubscriptionorder(data: any) {
    return this.http.post(this.baseurl + 'createSubscriptionorder', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listSubscriptionorderbyStore(data: any) {
    return this.http.post(this.baseurl + 'listSubscriptionorderbyStore', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  customerSignUp(data: any) {
    return this.http.post(this.baseurl + 'customerSignUp', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewDeliverymanbyStore(data: any) {
    return this.http.post(this.baseurl + 'viewDeliverymanbyStore', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  deliveryUserSignup(data: any) {
    return this.http.post(this.baseurl + 'deliveryUserSignup', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  viewCustomerAddress(data: any) {
    return this.http.post(this.baseurl + 'viewCustomerAddress', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  createDeliveryavailablity(data: any) {
    return this.http.post(this.baseurl + 'createDeliveryavailablity', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  listSubscriptionorderbyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listSubscriptionorderbyCustomer', data, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

}