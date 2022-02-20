import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { CommonService } from 'src/app/service/common/common.service';
import { AddCowmilkentryComponent } from '../add-cowmilkentry/add-cowmilkentry.component';
import { AddCowweightComponent } from '../add-cowweight/add-cowweight.component';
import { AddVaccinationComponent } from '../add-vaccination/add-vaccination.component';
import { ViewCowdetailComponent } from '../view-cowdetail/view-cowdetail.component';
import { ViewCowmilkentryComponent } from '../view-cowmilkentry/view-cowmilkentry.component';
import { ViewCowweightComponent } from '../view-cowweight/view-cowweight.component';
import { ViewVaccinationsComponent } from '../view-vaccinations/view-vaccinations.component';

@Component({
  selector: 'app-view-cow',
  templateUrl: './view-cow.component.html',
  styleUrls: ['./view-cow.component.scss']
})
export class ViewCowComponent implements OnInit {

  constructor(
    private apiservice: ApiService,
    private dialog: MatDialog,
    private commonservice: CommonService,
    private router: Router
  ) { }

  cows = [];

  ngOnInit() {

    this.commonservice.cowList.subscribe((data: any) => {
      this.cows = data;
    })

    this.apiservice.listCow()
      .subscribe((data: any) => {
        this.commonservice.updateCowList(data?.cow)
      })
  }

  editCow(data:any){
    this.apiservice.cowSelected = data;
    this.router.navigateByUrl('/edit-cow');
  }

  viewCowDetail(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowdetailComponent, {
      closeOnNavigation: true,
      width: '100%'
    });
  }

  viewVaccination(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewVaccinationsComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

  viewCowWeight(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowweightComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

  viewCowMilkEntries(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(ViewCowmilkentryComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

  addVaccination(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddVaccinationComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

  addCowWeight(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowweightComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

  addCowMilkEntry(data: any) {
    this.apiservice.cowSelected = data;
    this.dialog.open(AddCowmilkentryComponent, {
      closeOnNavigation: true,
      width: '75%'
    });
  }

}
