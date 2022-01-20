import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-subscriptionpack',
  templateUrl: './view-subscriptionpack.component.html',
  styleUrls: ['./view-subscriptionpack.component.scss']
})
export class ViewSubscriptionpackComponent implements OnInit {

  subscriptionpack : any = [];
  p=1;

  constructor(private apiservice : ApiService, private router: Router) { }

  ngOnInit(){
    this.apiservice.listSubscriptionpack()
     .subscribe((data:any)=>{
       this.subscriptionpack = data.subscriptionpack;
     })
  }

  editPack(value:any) {
    this.apiservice.packSelected = value;
    this.router.navigateByUrl('/edit-subscriptionpack');
  }

}