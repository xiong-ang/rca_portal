import { Component, OnInit } from '@angular/core';
import { PreventionInfoService } from '@app/services/prevention-info.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // preventionInfoService initial.
  constructor( private preventionInfoService: PreventionInfoService) { }

  ngOnInit() {
  }

}
