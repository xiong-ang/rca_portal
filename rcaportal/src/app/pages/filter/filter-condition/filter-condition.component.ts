import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatChipInputEvent } from '@angular/material';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
@Component({
  selector: 'app-filter-condition',
  templateUrl: './filter-condition.component.html',
  styleUrls: ['./filter-condition.component.css']
})
export class FilterConditionComponent implements OnInit {
  public isDetailFilterPanelOpen = false;
  impactedProducts: ProductInfo[] = [];
  fixVersionList: VersionInfo[] = [];
  componentList: ComponentInfo[] = [];
  readoutLevelList: ReadoutInfo[] = [];

  public inputQuickSearch: string = '';

  public inputID: string = '';

  public selectedVersionID = null;
  public selectedComponentID = null;
  public inputSubmitter: string = '';
  public inputRootCauseCR: string = '';

  public selectedreadoutLevelID = null;
  private _selectedProduct = null;
  get selectedProductID() { return this._selectedProduct; }
  set selectedProductID(value) {
    if (value != this._selectedProduct) {
      this._selectedProduct = value;
      if (this.selectedProductID) {
        this.loadVersAndCompByProductID(this.selectedProductID);
      }

    }
  }

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
      !this.selectedProductID &&
      !this.selectedVersionID &&
      !this.selectedComponentID &&
      !this.inputSubmitter &&
      !this.inputRootCauseCR &&
      !this.selectedreadoutLevelID &&
      this.inputKeywords.length == 0 &&
      !this.inputQuickSearch;
  }

  constructor(private filterSrv: FilterService,
    private requestProxyService: RequestProxyService) { }

  loadProductInfo() {
    this.requestProxyService.GetProducts()
    .then((productNames) => {
      this.impactedProducts = productNames;
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });
  }

  loadVersAndCompByProductID(productID: string) {
    this.requestProxyService.GetProductVersions(productID).then(versions => {
      this.fixVersionList = versions;
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });

    this.requestProxyService.GetProductComponents(productID).then(components => {
      this.componentList = components;
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });
  }

  loadReadoutLevelInfo() {
    this.requestProxyService.GetReadOutLevels().then(readoutLevels => {
      this.readoutLevelList = readoutLevels;
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });
  }

  loadKeyowrdTips() {
    this.Keyword_tips = [];
    this.requestProxyService.GetHotKeywords(1, 10).then(hotKeywords => {
      hotKeywords.forEach(keyword => {
        this.Keyword_tips.push(keyword.KeywordValue);
      });
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });
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
    filterCondition.RCAID = this.inputID && this.inputID.trim();

    filterCondition.ImpactedProductID = this.selectedProductID;
    let ProductInfo = this.impactedProducts && this.impactedProducts.find(x => x.ID == this.selectedProductID);
    filterCondition.ImpactedProduct = ProductInfo && ProductInfo.ProductName;

    filterCondition.ComponentID = this.selectedComponentID;
    let ComponentInfo = this.componentList && this.componentList.find(x =>  x.ID == this.selectedComponentID);;
    filterCondition.Component = ComponentInfo && ComponentInfo.ComponentName;

    filterCondition.FixVersionID = this.selectedVersionID;
    let VersionInfo = this.fixVersionList && this.fixVersionList.find(x =>  x.ID == this.selectedVersionID);
    filterCondition.FixVersion = VersionInfo  && VersionInfo.Version;

    filterCondition.ReadoutLevelID = this.selectedreadoutLevelID;
    let ReadoutInfo = this.readoutLevelList && this.readoutLevelList.find(x =>  x.ID == this.selectedreadoutLevelID);
    filterCondition.ReadoutLevel = ReadoutInfo && ReadoutInfo.ReadoutLevel;

    filterCondition.Keywords = this.inputKeywords;
    filterCondition.RootCauseCR = this.inputRootCauseCR && this.inputRootCauseCR.trim();
    filterCondition.Submitter = this.inputSubmitter && this.inputSubmitter.trim();
    filterCondition.QuickSearch = this.inputQuickSearch && this.inputQuickSearch.trim();

    //this.clear();

    this.filterSrv.showFilterResults(filterCondition);
  }

  clear() {
    this.inputID = '';
    this.selectedProductID = null;
    this.selectedVersionID = null;
    this.selectedComponentID = null;
    this.inputSubmitter = '';
    this.inputRootCauseCR = '';
    this.selectedreadoutLevelID = null;
    this.inputKeywords = [];
    this.inputQuickSearch = '';
  }

  ngOnInit() {
    this.loadProductInfo();
    if (this.selectedProductID) {
      this.loadVersAndCompByProductID(this.selectedProductID);
    }
    this.loadReadoutLevelInfo();
    this.loadKeyowrdTips();

    this.initDetailData();

    this.initChipsData();

    this.filterSrv.filterConditionChangeEvent.subscribe(() => {
      this.initDetailData();

      this.initChipsData();
    });
  }

  initDetailData() {
    let initFilterCondition = this.filterSrv.currentFilterCondition;

    this.inputID = initFilterCondition.RCAID;
    this.selectedProductID = initFilterCondition.ImpactedProductID;
    this.selectedVersionID = initFilterCondition.FixVersionID;
    this.selectedComponentID = initFilterCondition.ComponentID;
    this.inputSubmitter = initFilterCondition.Submitter;
    this.inputRootCauseCR = initFilterCondition.RootCauseCR;
    this.selectedreadoutLevelID = initFilterCondition.ReadoutLevelID;
    this.inputKeywords = initFilterCondition.Keywords;
    this.inputQuickSearch = initFilterCondition.QuickSearch;
  }

  ///////////////////////////////For chips and Quick search//////////////////////////////////////
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  coditions: Array<ChipCondition> = [];

  initChipsData() {
    this.coditions = [];
    let initFilterCondition = this.filterSrv.currentFilterCondition;

    if (initFilterCondition.RCAID) {
      this.coditions.push(new ChipCondition('ID', initFilterCondition.RCAID, 'accent'));
      return;
    }

    if (initFilterCondition.ImpactedProduct) {
      this.coditions.push(new ChipCondition('IMPACTED PRODUCT', initFilterCondition.ImpactedProduct, 'accent'));
    }

    if (initFilterCondition.FixVersion) {
      this.coditions.push(new ChipCondition('FIX VERSIONS', initFilterCondition.FixVersion, 'primary'));
    }

    if (initFilterCondition.Component) {
      this.coditions.push(new ChipCondition('COMPONENTS', initFilterCondition.Component, 'primary'));
    }

    if (initFilterCondition.Submitter) {
      this.coditions.push(new ChipCondition('SUBMITTER', initFilterCondition.Submitter, 'warn'));
    }

    if (initFilterCondition.RootCauseCR) {
      this.coditions.push(new ChipCondition('ROOT CAUSE CR', initFilterCondition.RootCauseCR, 'warn'));
    }

    if (initFilterCondition.ReadoutLevel) {
      this.coditions.push(new ChipCondition('READOUT LEVELS', initFilterCondition.ReadoutLevel, 'warn'));
    }

    if (initFilterCondition.Keywords && initFilterCondition.Keywords.length > 0) {
      this.coditions.push(new ChipCondition('KEYWORDS', initFilterCondition.Keywords, 'warn'));
    }

    if ((initFilterCondition.QuickSearch || '').trim()) {
      this.coditions.push(new ChipCondition('', initFilterCondition.QuickSearch, 'normal'));
    }
  }

  remove(codition: ChipCondition): void {
    const index = this.coditions.indexOf(codition);
    if (index >= 0) {
      this.coditions.splice(index, 1);

      switch (codition.key) {
        case 'ID':
          this.inputID = null;
          break;
        case 'IMPACTED PRODUCT':
          this.selectedProductID = null;
          break;
        case 'FIX VERSIONS':
          this.selectedVersionID = null;
          break;
        case 'COMPONENTS':
          this.selectedComponentID = null;
          break;
        case 'SUBMITTER':
          this.inputSubmitter = null;
          break;
        case 'ROOT CAUSE CR':
          this.inputRootCauseCR = null;
          break;
        case 'READOUT LEVELS':
          this.selectedreadoutLevelID = null;
          break;
        case 'KEYWORDS':
          this.inputKeywords = [];
          break;
        case '':
          this.inputQuickSearch = null;
          break;
      }

      this.onApply();
    }
  }

  quickSearch(): void {

    if ((this.inputQuickSearch || '').trim()) {
      this.onApply();
    }
  }
}

class ChipCondition {
  key: string;
  value: string;
  color: string;

  constructor(key, value, color) {
    this.key = key;
    this.value = value;
    this.color = color;
  }
}
