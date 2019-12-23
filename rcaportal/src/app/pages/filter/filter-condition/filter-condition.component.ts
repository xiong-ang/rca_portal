import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-filter-condition',
  templateUrl: './filter-condition.component.html',
  styleUrls: ['./filter-condition.component.css']
})
export class FilterConditionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
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


  ///////////////////////////////////////////////////////////////////////////////////
  public isDetailFilterPanelOpen = false;
  constructor() { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ///////////////////////////////////////////////////////////////////////////////////////
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  ////////////////////////////////////////////////////////////////////////////////////////
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
