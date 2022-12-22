import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  p = 1;
  term: any;
  storeSelected: string;
  stores: Array<any> = [];
  customer: Array<any> = [];

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data.stores;
      this.changeValue(this.storeSelected);
    });
  }

  viewCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/view-customer');
  }

  changeValue(value: any) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected,
    };
    this.apiservice
      .viewCustomerbyStore(this.storeSelected)
      .subscribe((data: any) => {
        this.customer = data?.customer;
      });
  }

  editCustomer(data: any) {
    this.apiservice.customerSelected = data;
    this.router.navigateByUrl('/edit-customer');
  }

  deleteCustomer(user: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: 'Are you sure to delete the customer?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          user,
        };
        this.apiservice.deleteUser(data).subscribe((data: any) => {
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
}
