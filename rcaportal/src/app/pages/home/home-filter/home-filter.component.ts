import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css']
})
export class HomeFilterComponent implements OnInit {
  public isDetailFilterPanelOpen = false;
  constructor() { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  triggerDetailFilterPanel(){
    this.isDetailFilterPanelOpen = !this.isDetailFilterPanelOpen;
  }

  onCancel(){
    this.isDetailFilterPanelOpen = false;
    // clear
  }

  onApply(){
    this.isDetailFilterPanelOpen = false;
    // apply logic
    // clear
  }
}
