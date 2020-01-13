import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface RCADialogData {
  type: string;
  rcaData: RCAItem;
}

@Component({
  selector: 'app-rca-dialog',
  templateUrl: './rca-dialog.component.html',
  styleUrls: ['./rca-dialog.component.css']
})
export class RcaDialogComponent  implements OnInit {
  public get isCreateMode(): boolean { return this.data.type == 'Create'; }
  public get dialogTitle(): string { return this.isCreateMode ? 'Create a new RCA' : 'Update RCA'; }
  public get testRCAData(): string { return JSON.stringify(this.data.rcaData); }
  rcaData: RCAItem;
  impactedProducts: string[] = [];
  readoutLevels: string[] = [];
  fixVersionList: string[] = [];
  componentList: string[] = [];
  isFixVersionListReady = false;
  isComponentListReady = false;
  keyWordCtrl = new FormControl();

  filteredKeyWords: Observable<string[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allKeywords: string[] = ['AKeyword0', 'ABKeyword1', 'ABCKeyword2', 'ABCDKeyword3', 'Keyword4', 'Keyword5'];
  keyWordTips: string[] = ['AKeyword0', 'ABKeyword1', 'ABCKeyword2','AKeyword0', 'AKeyword0', 'ABKeyword1', 'ABCKeyword2','AKeyword0', 'ABKeyword1', 'ABCKeyword2','ABKeyword1', 'ABCKeyword2','AKeyword0', 'ABKeyword1', 'ABCKeyword2', 'ABCDKeyword3', 'Keyword4', 'Keyword5',];
  @ViewChild('keyWordInput', {static: false}) keyWordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<RcaDialogComponent>,
    private requestProxyService: RequestProxyService,
    @Inject(MAT_DIALOG_DATA) public data: RCADialogData) {
      this.filteredKeyWords = this.keyWordCtrl.valueChanges.pipe(
        startWith(null),
        map((keyWord: string | null) => keyWord ? this._filter(keyWord) : this.allKeywords.slice()));
     }

  ngOnInit() {
    this.rcaData = this.data.rcaData;
    this.loadProductInfo();
    this.loadReadOutInfo();
    if (this.data.type === 'Update') {
      this.loadVersionsAndComponents();
    }
  }

  get isAllowApply() {
    return this.rcaData.ID.length !== 0 &&
      this.rcaData.Header.length !== 0 &&
      this.rcaData.Submitter.length !== 0 &&
      this.rcaData.KeyWords.length !== 0 &&
      this.rcaData.RootCauseAnalyze.length !== 0 &&
      this.rcaData.FixVersion.length !== 0 &&
      this.rcaData.ImpactedProduct.length !== 0 &&
      this.rcaData.Component.length !== 0 ;
      //To do
  }

  get selectedProduct() { return this.rcaData.ImpactedProduct; }
  set selectedProduct(value) {

    if (value != this.rcaData.ImpactedProduct) {
      this.isComponentListReady = false;
      this.isFixVersionListReady = false;
      this.rcaData.ImpactedProduct = value;
      this.loadVersionsAndComponents();
    }
  }
  loadProductInfo() {
    this.requestProxyService.GetProducts().then(productNames => {
      this.impactedProducts = productNames;
    });
  }
  loadReadOutInfo() {
    this.requestProxyService.GetReadOutLevels().then(readoutLevels => {
      this.readoutLevels = readoutLevels;
    });
  }


  loadVersionsAndComponents() {
    this.fixVersionList = [];
    this.requestProxyService.GetProductVersions(this.rcaData.ImpactedProduct).then(versions => {
      this.fixVersionList = versions;
      this.isFixVersionListReady = true;
    });

    this.componentList = [];
    this.requestProxyService.GetProductComponents(this.rcaData.ImpactedProduct).then(components => {
      this.componentList = components;
      this.isComponentListReady = true;
    });
  }

  add(event: MatChipInputEvent): void {
    // Add keyword only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our keyword
      if ((value || '').trim()) {
        this.rcaData.KeyWords.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.keyWordCtrl.setValue('');
    }
  }

  remove(keyword: string): void {
    const index = this.rcaData.KeyWords.indexOf(keyword);

    if (index >= 0) {
      this.rcaData.KeyWords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.rcaData.KeyWords.push(event.option.viewValue);
    this.keyWordInput.nativeElement.value = '';
    this.keyWordCtrl.setValue('');

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allKeywords.filter(keyword => keyword.toLowerCase().indexOf(filterValue) === 0);
  }

  OnClickKeyWordTip(keyWord: string) {
    this.rcaData.KeyWords.push(keyWord);
  }



  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close();

    //TODO: Get RCAItem -> data.rcaData

    this.requestProxyService.CreateRCA(this.rcaData);
  }

  onUpdateClick(): void {
    this.dialogRef.close();

    //TODO: Fetch RCAItem -> data.rcaData

    this.requestProxyService.UpdateRCA(this.rcaData.ID, this.rcaData);
  }

}
