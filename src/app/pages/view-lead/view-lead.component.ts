import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.component.html',
  styleUrls: ['./view-lead.component.scss'],
})
export class ViewLeadComponent implements OnInit {
  storeSelected: string;
  leads: Array<any>;
  stores: Array<any>;
  p = 1;
  term: string;

  constructor(private apiservice: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiservice.listStores().subscribe((data: any) => {
      this.stores = data.stores;
      this.changeValue(data.stores[0]._id);
    });
  }

  changeValue(value: string) {
    this.storeSelected = value;
    let data = {
      store: this.storeSelected,
    };
    this.apiservice.listLeads(data).subscribe((data: any) => {
      this.leads = data.leads;
    });
  }

  editLead(value: any) {
    this.apiservice.leadSelected = value;
    this.router.navigateByUrl('/edit-lead');
  }
}
