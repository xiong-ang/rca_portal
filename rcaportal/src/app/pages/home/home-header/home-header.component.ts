import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(private router: Router, private rcaDialogSrv: RcaDialogService, private filterSrv: FilterService) { }

  ngOnInit() {
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');
  }

  onMyCRsClick(){
    this.filterSrv.openFilterResultPage();
  }

  onAddCRClick(){
    this.rcaDialogSrv.openCreateDialog();
  }
}
