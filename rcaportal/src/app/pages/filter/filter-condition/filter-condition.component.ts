import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';


@Component({
  selector: 'app-filter-condition',
  templateUrl: './filter-condition.component.html',
  styleUrls: ['./filter-condition.component.css']
})
export class FilterConditionComponent implements OnInit {
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

  submitterFormControl = new FormControl();

  rootCauseCRFormControl = new FormControl();

  isReadoutChecked = true;
  isNotReadoutChecked = true;

  keywordsCRFormControl = new FormControl();

  quickSearchFormControl = new FormControl();

  public isDetailFilterPanelOpen = false;


  constructor(private filterSrv: FilterService) { }

  ngOnInit() { }

  triggerDetailFilterPanel() {
    this.isDetailFilterPanelOpen = !this.isDetailFilterPanelOpen;
  }

  onCancel() {
    this.isDetailFilterPanelOpen = false;
  }

  onApply() {
    this.isDetailFilterPanelOpen = false;
    let filterCondition = new FilterCondition();
    /*
    filterCondition.ID = ;
    filterCondition.ImpactedProduct = ;
    filterCondition.Component = ;
    filterCondition.FixVersion = ;
    filterCondition.IsReadout = ;
    filterCondition.Keywords = ;
    filterCondition.RootCauseCR = ;
    filterCondition.Submitter = ;
    */

    this.filterSrv.openFilterResultPage(filterCondition);
  }

  /////////////////////////////////////////////////////////////////////
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
