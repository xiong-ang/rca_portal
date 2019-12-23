import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {

  constructor(private router: Router, private rcaDialogSrv: RcaDialogService) { }

  ngOnInit() {
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');
  }

  onMyCRsClick(){
    this.router.navigateByUrl('/filter');
  }

  onAddCRClick(){
    this.rcaDialogSrv.openDialog();
  }
}
