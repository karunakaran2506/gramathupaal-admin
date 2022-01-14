import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-subscriptionpack',
  templateUrl: './view-subscriptionpack.component.html',
  styleUrls: ['./view-subscriptionpack.component.scss']
})
export class ViewSubscriptionpackComponent implements OnInit {

  subscriptionpack : any = [];
  p=1;

  constructor(private apiservice : ApiService) { }

  ngOnInit(){
    this.apiservice.listSubscriptionpack()
     .subscribe((data:any)=>{
       this.subscriptionpack = data.subscriptionpack;
     })
  }

}