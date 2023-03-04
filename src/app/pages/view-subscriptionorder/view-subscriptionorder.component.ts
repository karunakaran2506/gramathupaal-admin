import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';
import { ViewDeliveryhistoryComponent } from '../view-deliveryhistory/view-deliveryhistory.component';

@Component({
  selector: 'app-view-subscriptionorder',
  templateUrl: './view-subscriptionorder.component.html',
  styleUrls: ['./view-subscriptionorder.component.scss'],
})
export class ViewSubscriptionorderComponent implements OnInit {
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  p = 1;
  term: any;
  storeSelected: string;
  deliverymanSelected: string = 'all';
  stores: Array<any> = [];
  allOrder: Array<any> = [];
  order: Array<any> = [];
  deliveryman: Array<any>;

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data.stores;
      this.changeValue();
    });
  }

  changeValue() {
    let data = {
      store: this.storeSelected,
    };
    this.apiservice
      .listActiveSubscriptionorderbyStore(data)
      .subscribe((data: any) => {
        this.order = data?.order; 
        this.allOrder = data?.order;
      });

    this.apiservice.viewDeliverymanbyStore(data).subscribe((data: any) => {
      this.deliverymanSelected = 'all';
      this.deliveryman = data?.deliveryman;
    });
  }

  filterDeliveryman() {
    if (this.deliverymanSelected === 'all') {
      this.order = this.allOrder;
    } else {
      let data = {
        store: this.storeSelected,
        deliveryman: this.deliverymanSelected,
      };
      this.apiservice
        .listActiveSubscriptionorderbyDeliveryMan(data)
        .subscribe((data: any) => {
          this.order = data?.order;
        });
    }
  }

  viewHistory(data: any) {
    this.dialog.open(ViewDeliveryhistoryComponent, {
      closeOnNavigation: true,
      width: '70%',
      data,
    });
  }

  editOrder(value: any) {
    this.apiservice.subscriptionorderSelected = value;
    this.router.navigateByUrl('/edit-activesubscription');
  }

  deactivateOrder(subscriptionorder: string) {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: 'Are you sure to deactivate the order?',
    });
    confirmationDialog.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          subscriptionorder,
        };
        this.apiservice
          .deactivateSubscriptionorder(data)
          .subscribe((data: any) => {
            if (data?.success) {
              this.toastr.success(data?.message);
              this.ngOnInit();
            } else {
              this.toastr.error(data?.message);
            }
          });
      }
    });
  }

  createQRUrl(id: string){
    return `${environment.deliveryUrl}/milk-delivery/qrscan/${id}`
  }
}
