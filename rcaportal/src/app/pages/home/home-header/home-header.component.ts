import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

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
