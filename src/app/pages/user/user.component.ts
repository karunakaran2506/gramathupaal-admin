import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ViewSessionComponent } from '../view-session/view-session.component';
import { ViewUserprofileComponent } from '../view-userprofile/view-userprofile.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  storeSelected: string;
  users: Array<any>;
  stores: Array<any>;
  p = 1;

  constructor(
    private dialog: MatDialog,
    private apiservice: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data.stores;
      this.changeValue(this.storeSelected);
    });
  }

  changeValue(value: string) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected,
    };
    this.apiservice.viewUsers(data).subscribe((data: any) => {
      this.users = data.users;
    });
  }

  editProduct(value: string) {
    this.apiservice.productSelected = value;
    this.router.navigateByUrl('edit-product');
  }

  openProfile(user: any) {
    this.apiservice.userSelected = user;
    this.dialog.open(ViewUserprofileComponent, {
      closeOnNavigation: true,
      width: '50%',
    });
  }

  openSession(user: any) {
    this.apiservice.userSelected = user;
    this.dialog.open(ViewSessionComponent, {
      closeOnNavigation: true,
      width: '50%',
    });
  }

  editUser(value: any) {
    this.apiservice.userSelected = value;
    this.router.navigateByUrl('/edit-user');
  }

  userSales(value: any) {
    this.apiservice.userSelected = value;
    this.router.navigateByUrl('/past-sales');
  }

  deleteUser(user: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: 'Are you sure to delete the user?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          user,
        };
        this.apiservice.deleteUser(data).subscribe((data: any) => {
          if (data?.success) {
            this.toastr.success(data?.message);
            this.changeValue(this.storeSelected);
          } else {
            this.toastr.error(data?.message);
          }
        });
      }
    });
  }
}
