import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-subscriptionorder',
  templateUrl: './view-subscriptionorder.component.html',
  styleUrls: ['./view-subscriptionorder.component.scss']
})
export class ViewSubscriptionorderComponent implements OnInit {

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  p = 1;
  term : any;
  storeSelected: string;
  stores: Array<any> = [];
  order: Array<any> = [];

  ngOnInit() {

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data?.stores[0]?._id;
        this.stores = data.stores;
        this.changeValue(this.storeSelected);
      })
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected
    }
    this.apiservice.listActiveSubscriptionorderbyStore(data)
      .subscribe((data: any) => {
        this.order = data?.order;
      })
  }

  editOrder(value: any) {
    this.apiservice.subscriptionorderSelected = value;
    this.router.navigateByUrl('/edit-activesubscription');
  }

  deactivateOrder(subscriptionorder: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: "Are you sure to deactivate the order?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          subscriptionorder
        }
        this.apiservice.deactivateSubscriptionorder(data)
          .subscribe((data: any) => {
            if (data?.success) {
              this.toastr.success(data?.message);
              this.ngOnInit();
            } else {
              this.toastr.error(data?.message);
            }
          })
      }
    });
  }

}
