import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-view-userprofile',
  templateUrl: './view-userprofile.component.html',
  styleUrls: ['./view-userprofile.component.scss']
})
export class ViewUserprofileComponent implements OnInit {

  user: any;
  store: any;
  session: any;
  currentUser: any;
  totalamount = 0;

  constructor(
    private apiservice: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.apiservice.userSelected;

    let data = {
      user: this.currentUser?._id
    }

    this.apiservice.viewUserDetails(data)
      .subscribe((data: any) => {
        this.user = data?.user;
        this.session = data?.session;
        this.store = this.user?.store;
      })
  }

  openPage(page: any) {
    this.router.navigateByUrl(page);
  }

}
