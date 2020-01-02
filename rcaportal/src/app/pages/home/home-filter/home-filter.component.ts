import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css']
})
export class HomeFilterComponent implements OnInit {
  public isDetailFilterPanelOpen = false;
  IDFormControl = new FormControl('', [
    Validators.email, // need to implement validator
  ]);
  fixVersions = new FormControl();
  fixVersionList: string[] = ['v1.0', 'v2.0', 'v3.0', 'v4.0', 'v4.1', 'v5.1'];
  components = new FormControl();
  componentList: string[] = ['component1', 'component2', 'component3', 'component4', 'component5', 'component6'];
  impactedProducts = [
    { value: 'FTView SE', viewValue: 'FTView SE' },
    { value: 'FTView ME', viewValue: 'FTView ME' },
    { value: 'CCW', viewValue: 'CCW' },
  ];

  submitterFormControl = new FormControl('', [
    Validators.email, // need to implement validator
  ]);

  rootCauseCRFormControl = new FormControl('', [
    Validators.email, // need to implement validator
  ]);

  isReadoutChecked = true;
  isNotReadoutChecked = true;

  keywordsCRFormControl = new FormControl('', [
    Validators.email, // need to implement validator
  ]);

  constructor(private filterSrv: FilterService) { }

  ngOnInit() {
  }

  triggerDetailFilterPanel() {
    this.isDetailFilterPanelOpen = !this.isDetailFilterPanelOpen;
  }

  onCancel() {
    this.isDetailFilterPanelOpen = false;
    // clear
  }

  onApply() {
    this.isDetailFilterPanelOpen = false;
    // apply logic
    // clear
    this.filterSrv.openFilterResultPage();
  }
}
