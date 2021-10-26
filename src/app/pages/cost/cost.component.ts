import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {

  storeSelected : string;
  dateSelected : string;
  entries : Array<any>;
  stores : Array<any>;
  totalincome : number = 0;
  totalexpense : number = 0;
  p=1;

  constructor(
    private apiservice : ApiService,
    private toastr : ToastrService
  ) { }

  ngOnInit(){

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       console.log('data', data);
       this.stores = data.stores;
     })
  }

  datechange(value){

    this.totalexpense = 0;
    this.totalincome = 0;

    this.dateSelected = value;

    if(this.storeSelected){
      let data = {
        date : value,
        store : this.storeSelected
      }
      this.apiservice.listEntries(data)
       .subscribe((data:any)=>{
         console.log('data', data);
         this.entries = data.entries;

         this.entries.map((x:any)=>{
           if(x.type === 'expenses'){
             this.totalexpense = this.totalexpense + x.amount;
           }
           else if(x.type === 'sales'){
            this.totalincome = this.totalincome + x.amount;
          }
         })
       })
    }
    else{
      this.toastr.error('Select a store');
    }
  }

  changeValue(value){
    this.storeSelected = value;
    if(this.dateSelected){
      this.datechange(this.dateSelected);
    }
  }

}
