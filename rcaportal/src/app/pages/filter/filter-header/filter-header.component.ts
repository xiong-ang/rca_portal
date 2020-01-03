import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';

import { FilterService } from 'src/app/services/filter.service';

import { AuthenticationService } from '@app/services/authentication.service';
import { User } from '@app/entities/user';
import { FilterCondition } from '@app/entities/filterCondition';


@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {

  currentUser: User;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private rcaDialogSrv: RcaDialogService, private filterSrv: FilterService, private authenticationService: AuthenticationService) { }


  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');
  }

  onMyCRsClick(){
    let filterCondition = new FilterCondition();
    filterCondition.Submitter = this.currentUser.userName;

    this.filterSrv.openFilterResultPage(filterCondition);
  }

  onAddCRClick(){
    this.rcaDialogSrv.openCreateDialog();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
