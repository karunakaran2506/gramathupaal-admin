import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = environment.url + 'api/';
  leadSelected: any;
  stockSelected: any;
  packSelected: any;
  cowSelected: any;
  customerSelected: any;
  feedledgerSelected: any;
  deliveryuserSelected: any;
  orderselected: any;
  productSelected: any;
  userSelected: any;
  subscriptionorderSelected: any;
  milkentrymanSelected: any;
  milkcardSelected: any;
  productionSelected: any;

  table: any;
  coupon: any;
  category: any;
  menuitem: any;
  restaurant: any;
  status: any;
  currentuser: any;
  currentrole: any;

  constructor(private http: HttpClient) {}

  adminLogin(data: any) {
    return this.http.post(this.baseurl + 'adminLogin', data, {});
  }

  viewUsers(data: any) {
    return this.http.post(this.baseurl + 'viewUsers', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deleteUser(data: any) {
    return this.http.post(this.baseurl + 'deleteUser', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewUserDetails(data: any) {
    return this.http.post(this.baseurl + 'viewUserDetails', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  userSignup(data: any) {
    return this.http.post(this.baseurl + 'userSignup', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  userSignupWithImage(data: any) {
    return this.http.post(this.baseurl + 'userSignupWithImage', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editUser(data: any) {
    return this.http.post(this.baseurl + 'editUser', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editUserWithoutImage(data: any) {
    return this.http.post(this.baseurl + 'editUserWithoutImage', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listStores() {
    return this.http.get(this.baseurl + 'listStores', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listOrders(data: any) {
    return this.http.post(this.baseurl + 'listOrdersbyDate', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listEntries(data: any) {
    return this.http.post(this.baseurl + 'listEntries', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listCategory(data: any) {
    return this.http.post(this.baseurl + 'listCategory', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listProduct(data: any) {
    return this.http.post(this.baseurl + 'listProduct', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deleteProduct(data: any) {
    return this.http.post(this.baseurl + 'deleteProduct', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listStockEntries(data: any) {
    return this.http.post(this.baseurl + 'listAllStockEntries', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listTodayStockBalance(data: any) {
    return this.http.post(this.baseurl + 'listTodayStockBalance', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listStockEntriesbyProduct(data: any) {
    return this.http.post(this.baseurl + 'listStockEntriesByProduct', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listTodayStockEntries(data: any) {
    return this.http.post(this.baseurl + 'listTodayStockEntries', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listStockEntriesByDate(data: any) {
    return this.http.post(this.baseurl + 'listStockEntriesByDate', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listUserwiseStockEntries(data: any) {
    return this.http.post(this.baseurl + 'listUserwiseStockEntries', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  todayOrders(data: any) {
    return this.http.post(this.baseurl + 'todayOrders', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deleteOrder(data: any) {
    return this.http.post(this.baseurl + 'deleteOrder', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addProduct(data: any) {
    return this.http.post(this.baseurl + 'createProduct', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editProduct(data: any) {
    return this.http.post(this.baseurl + 'editProduct', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editProductwithoutImage(data: any) {
    return this.http.post(this.baseurl + 'editProductwithoutImage', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addcategory(data: any) {
    return this.http.post(this.baseurl + 'createCategory', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  saveStockEntry(data: any) {
    return this.http.post(this.baseurl + 'saveStockEntry', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  saveCostEntry(data: any) {
    return this.http.post(this.baseurl + 'saveCostEntry', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  dashboarDetails() {
    return this.http.get(this.baseurl + 'dashboarDetails', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewUserPastSales(data: any) {
    return this.http.post(this.baseurl + 'viewUserPastSales', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewUserPastSessions(data: any) {
    return this.http.post(this.baseurl + 'viewUserPastSessions', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  todayOrderDetails(data: any) {
    return this.http.post(this.baseurl + 'todayOrderDetails', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  datewiseOrderDetails(data: any) {
    return this.http.post(this.baseurl + 'datewiseOrderDetails', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  createMilkcard(data: any) {
    return this.http.post(this.baseurl + 'createMilkcard', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listMilkcard() {
    return this.http.get(this.baseurl + 'listMilkcard', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewCustomerbyStore(store) {
    return this.http.get(this.baseurl + 'viewCustomerbyStore', {
      headers: {
        token: localStorage.getItem('token'),
        store,
      },
    });
  }

  listOrdersbyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listOrdersbyCustomer', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listProductTokenbyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listProductTokenbyCustomer', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listMilkcardEntrybyCustomer(data: any) {
    return this.http.post(this.baseurl + 'listMilkcardEntrybyCustomer', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  overallTodayOrderDetails() {
    return this.http.get(this.baseurl + 'overallTodayOrderDetails', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listMilkcardHistorybyStore(data: any) {
    return this.http.post(this.baseurl + 'listMilkcardHistorybyStore', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listTokenHistorybyStore(data: any) {
    return this.http.post(this.baseurl + 'listTokenHistorybyStore', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  createSubscriptionpack(data: any) {
    return this.http.post(this.baseurl + 'createSubscriptionpack', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editSubscriptionpack(data: any) {
    return this.http.post(this.baseurl + 'editSubscriptionpack', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listSubscriptionpack() {
    return this.http.get(this.baseurl + 'listSubscriptionpack', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  createSubscriptionorder(data: any) {
    return this.http.post(this.baseurl + 'createSubscriptionorder', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editSubscriptionorder(data: any) {
    return this.http.post(this.baseurl + 'editSubscriptionorder', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deactivateSubscriptionorder(data: any) {
    return this.http.post(this.baseurl + 'deactivateSubscriptionorder', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listActiveSubscriptionorderbyStore(data: any) {
    return this.http.post(
      this.baseurl + 'listActiveSubscriptionorderbyStore',
      data,
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  listActiveSubscriptionorderbyDeliveryMan(data: any) {
    return this.http.post(
      this.baseurl + 'listActiveSubscriptionorderbyDeliveryMan',
      data,
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  listSubscriptionHistorybyStore(data: any) {
    return this.http.post(
      this.baseurl + 'listSubscriptionHistorybyStore',
      data,
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  customerSignUp(data: any) {
    return this.http.post(this.baseurl + 'customerSignUp', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editCustomer(data: any) {
    return this.http.post(this.baseurl + 'editCustomer', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewDeliverymanbyStore(data: any) {
    return this.http.post(this.baseurl + 'viewDeliverymanbyStore', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deliveryUserSignup(data: any) {
    return this.http.post(this.baseurl + 'deliveryUserSignup', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editDeliveryUser(data: any) {
    return this.http.post(this.baseurl + 'editDeliveryUser', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewCustomerAddress(data: any) {
    return this.http.post(this.baseurl + 'viewCustomerAddress', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  createDeliveryavailablity(data: any) {
    return this.http.post(this.baseurl + 'createDeliveryavailablity', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listSubscriptionorderbyCustomer(data: any) {
    return this.http.post(
      this.baseurl + 'listSubscriptionorderbyCustomer',
      data,
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  addlead(data: any) {
    return this.http.post(this.baseurl + 'createLead', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editLead(data: any) {
    return this.http.post(this.baseurl + 'editLead', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listLeads(data: any) {
    return this.http.post(this.baseurl + 'listLeads', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  milkSupplyEntry(data: any) {
    return this.http.post(this.baseurl + 'milkSupplyEntry', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listTodayMilkSupplies(data: any) {
    return this.http.post(this.baseurl + 'listTodayMilkSupplies', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listDeliveryEntries() {
    return this.http.get(this.baseurl + 'listDeliveryEntries', {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listDeliveryEntriesbyDate(data: any) {
    return this.http.post(this.baseurl + 'listDeliveryEntriesbyDate', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  // cow

  addCow(data: any) {
    return this.http.post(this.baseurl + 'addCow', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editCow(data: any) {
    return this.http.post(this.baseurl + 'editCow', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deleteCow(data: any) {
    return this.http.post(this.baseurl + 'deleteCow', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listCow(data: any) {
    return this.http.post(this.baseurl + 'listCow', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addVaccination(data: any) {
    return this.http.post(this.baseurl + 'addVaccination', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowWeight(data: any) {
    return this.http.post(this.baseurl + 'addCowWeight', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowMilk(data: any) {
    return this.http.post(this.baseurl + 'addCowMilk', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowDewarming(data: any) {
    return this.http.post(this.baseurl + 'addCowDewarming', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowHeat(data: any) {
    return this.http.post(this.baseurl + 'addCowHeat', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowTeeth(data: any) {
    return this.http.post(this.baseurl + 'addCowTeeth', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCowTreatment(data: any) {
    return this.http.post(this.baseurl + 'addCowTreatment', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  addCalfDelivery(data: any) {
    return this.http.post(this.baseurl + 'addCalfDelivery', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editMilkcard(data: any) {
    return this.http.post(this.baseurl + 'editMilkcard', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  deleteMilkcard(data: any) {
    return this.http.post(this.baseurl + 'deleteMilkcard', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  // Milk entry man

  createMilkentryman(data: any) {
    return this.http.post(this.baseurl + 'createMilkentryman', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  milkentrymanLogin(data: any) {
    return this.http.post(this.baseurl + 'milkentrymanLogin', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editMilkentryman(data: any) {
    return this.http.post(this.baseurl + 'editMilkentryman', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewMilkentrymanbyStore(data: any) {
    return this.http.post(this.baseurl + 'viewMilkentrymanbyStore', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewCowMilkEntrybyDate(data: any) {
    return this.http.post(this.baseurl + 'viewCowMilkEntrybyDate', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewCowTreatment(data: any) {
    return this.http.post(this.baseurl + 'viewCowTreatment', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewCalfDelivery(data: any) {
    return this.http.post(this.baseurl + 'viewCalfDelivery', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  // Production

  createProduction(data: any) {
    return this.http.post(this.baseurl + 'createProduction', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listProduction(data: any) {
    return this.http.post(this.baseurl + 'listProduction', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  editProduction(data: any) {
    return this.http.post(this.baseurl + 'editProduction', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  // Feed Stock

  saveFeedStockEntry(data: any) {
    return this.http.post(this.baseurl + 'saveFeedStockEntry', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listFeedStock(data: any) {
    return this.http.post(this.baseurl + 'listFeedStock', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  createFeed(data: any) {
    return this.http.post(this.baseurl + 'createFeed', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listFeed(data: any) {
    return this.http.post(this.baseurl + 'listFeed', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  saveFeedLedgerEntry(data: any) {
    return this.http.post(this.baseurl + 'saveFeedLedgerEntry', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listFeedLedger(data: any) {
    return this.http.post(this.baseurl + 'listFeedLedger', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  updateBalance(data: any) {
    return this.http.post(this.baseurl + 'updateBalance', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  listAllFeedStock(data: any) {
    return this.http.post(this.baseurl + 'listAllFeedStock', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  viewDeliveryHistory(data: any) {
    return this.http.post(this.baseurl + 'viewDeliveryHistory', data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }
}
