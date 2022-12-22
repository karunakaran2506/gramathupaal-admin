import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddCowdewarmingComponent } from '../add-cowdewarming/add-cowdewarming.component';
import { AddCowheatComponent } from '../add-cowheat/add-cowheat.component';
import { AddCowmilkentryComponent } from '../add-cowmilkentry/add-cowmilkentry.component';
import { AddCowteethComponent } from '../add-cowteeth/add-cowteeth.component';
import { AddCowweightComponent } from '../add-cowweight/add-cowweight.component';
import { AddVaccinationComponent } from '../add-vaccination/add-vaccination.component';
import { ViewCowdetailComponent } from '../view-cowdetail/view-cowdetail.component';
import { ViewCowdewarmingComponent } from '../view-cowdewarming/view-cowdewarming.component';
import { ViewCowheatComponent } from '../view-cowheat/view-cowheat.component';
import { ViewCowmilkentryComponent } from '../view-cowmilkentry/view-cowmilkentry.component';
import { ViewCowteethComponent } from '../view-cowteeth/view-cowteeth.component';
import { ViewCowweightComponent } from '../view-cowweight/view-cowweight.component';
import { ViewVaccinationsComponent } from '../view-vaccinations/view-vaccinations.component';

@Component({
  selector: 'app-view-cow',
  templateUrl: './view-cow.component.html',
  styleUrls: ['./view-cow.component.scss'],
})
export class ViewCowComponent implements OnInit {
  constructor(
    private apiservice: ApiService,
    private dialog: MatDialog,
    private commonservice: CommonService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  p=1;
  cows = [];
  term: any;
  storeSelected: string;
  stores: Array<any> = [];

  ngOnInit() {
    this.commonservice.cowList.subscribe((data: any) => {
      this.cows = data;
    });

    this.apiservice.listStores().subscribe((data: any) => {
      this.storeSelected = data?.stores[0]?._id;
      this.stores = data.stores;
      this.changeValue();
    });
  }

  changeValue() {
    this.apiservice.listCow({ store: this.storeSelected }).subscribe((data: any) => {
      this.commonservice.updateCowList(data?.cow);
    });
  }

  editCow(data: any) {
    this.apiservice.cowSelected = data;
    this.router.navigateByUrl('/edit-cow');
  }

  deleteCow(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      width: '70%',
      data: 'Are you sure to delete the cow?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          id,
        };
        this.apiservice.deleteCow(data).subscribe((data: any) => {
          if (data?.success) {
            this.toastr.success(data?.message);
            this.changeValue();
          } else {
            this.toastr.error(data?.message);
          }
        });
      }
    });
  }

  viewCowDetail(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowdetailComponent, {
      closeOnNavigation: true,
      width: '100%',
    });
  }

  viewVaccination(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewVaccinationsComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  viewCowWeight(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowweightComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  viewCowMilkEntries(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowmilkentryComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  viewCowDewarming(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowdewarmingComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  viewCowHeat(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowheatComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  viewCowTeeth(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowteethComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addCowDewarming(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowdewarmingComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addCowHeat(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowheatComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addVaccination(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddVaccinationComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addCowWeight(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowweightComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addCowMilkEntry(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowmilkentryComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }

  addCowTeeth(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowteethComponent, {
      closeOnNavigation: true,
      width: '75%',
    });
  }
}
