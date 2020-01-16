import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css']
})
export class HomeFilterComponent implements OnInit {
  public isDetailFilterPanelOpen = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  impactedProducts = [];
  fixVersionList: string[] = [];
  componentList: string[] = [];
  readoutLevelList: string[] = [];


  public inputID: string = '';
  private _selectedProduct = null;
  get selectedProduct() { return this._selectedProduct; }
  set selectedProduct(value) {
    if (value != this._selectedProduct) {
      this._selectedProduct = value;

      this.fixVersionList = [];
      this.requestProxyService.GetProductVersions(this._selectedProduct).then(versions => {
        this.fixVersionList = versions;
      });

      this.componentList = [];
      this.requestProxyService.GetProductComponents(this._selectedProduct).then(components => {
        this.componentList = components;
      })
    }
  }
  public selectedVersions = [];
  public selectedComponents = [];
  public inputSubmitter: string = '';
  public inputRootCauseCR: string = '';

  public selectedreadoutLevels = [];

  public inputKeywords: string[] = [];
  public Keyword_tips: string[] = [];
  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() &&
      !this.inputKeywords.includes(value) &&
      this.inputKeywords.length < 3) {
      this.inputKeywords.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeKeyword(Keyword: string): void {
    const index = this.inputKeywords.indexOf(Keyword);

    if (index >= 0) {
      this.inputKeywords.splice(index, 1);
    }
  }

  keyword_tip_click(keywordTip: string) {
    if ((keywordTip || '').trim() &&
      !this.inputKeywords.includes(keywordTip) &&
      this.inputKeywords.length < 3) {
      this.inputKeywords.push(keywordTip.trim());
    }
  }

  get isNothingInput() {
    return !this.inputID &&
      !this.selectedProduct &&
      this.selectedVersions.length == 0 &&
      this.selectedComponents.length == 0 &&
      !this.inputSubmitter &&
      !this.inputRootCauseCR &&
      this.selectedreadoutLevels.length == 0 &&
      this.inputKeywords.length == 0;
  }

  constructor(private filterSrv: FilterService,
    private requestProxyService: RequestProxyService) { }

  loadProductInfo() {
    this.requestProxyService.GetProducts().then(productNames => {
      this.impactedProducts = productNames;
    });
  }

  loadReadoutLevelInfo() {
    this.requestProxyService.GetReadOutLevels().then(readoutLevels => {
      this.readoutLevelList = readoutLevels;
    });
  }

  loadKeyowrdTips() {
    this.Keyword_tips = [];
    this.requestProxyService.GetHotKeywords(0, 10).then(hotKeywords => {
      hotKeywords.forEach(keyword => {
        this.Keyword_tips.push(keyword.KeywordValue);
      })
    })
  }

  triggerDetailFilterPanel() {
    this.isDetailFilterPanelOpen = !this.isDetailFilterPanelOpen;
  }

  onCancel() {
    this.isDetailFilterPanelOpen = false;
  }

  onApply() {
    this.isDetailFilterPanelOpen = false;
    let filterCondition = new FilterCondition();
    filterCondition.ID = this.inputID;
    filterCondition.ImpactedProduct = this.selectedProduct;
    filterCondition.Components = this.selectedComponents;
    filterCondition.FixVersions = this.selectedVersions;
    filterCondition.ReadoutLevels = this.selectedreadoutLevels;
    filterCondition.Keywords = this.inputKeywords;
    filterCondition.RootCauseCR = this.inputRootCauseCR;
    filterCondition.Submitter = this.inputSubmitter;

    this.clear();

    this.filterSrv.showFilterResults(filterCondition);
  }

  clear() {
    this.inputID = '';
    this.selectedProduct = null;
    this.selectedVersions = [];
    this.selectedComponents = [];
    this.inputSubmitter = '';
    this.inputRootCauseCR = '';
    this.selectedreadoutLevels = [];
    this.inputKeywords = [];
  }

  ngOnInit() {
    this.loadProductInfo();
    this.loadReadoutLevelInfo();
    this.loadKeyowrdTips();
  }
}
