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
import { copyArrayItem } from '@angular/cdk/drag-drop';
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
  impactedProducts: ProductInfo[] = [];
  fixVersionList: VersionInfo[] = [];
  componentList: ComponentInfo[] = [];
  readoutLevelList: ReadoutInfo[] = [];


  public inputID: string = '';
  private _selectedProduct = null;
  get selectedProductID() { return this._selectedProduct; }
  set selectedProductID(value) {
    if (value != this._selectedProduct) {
      this._selectedProduct = value;
      if (this.selectedProductID) {
        this.requestProxyService.GetProductVersions(this.selectedProductID).then(versions => {
          this.fixVersionList = versions;
        },
        (error) => {
          if (error) {
          alert(error);
        }
        });
        this.requestProxyService.GetProductComponents(this.selectedProductID).then(components => {
          this.componentList = components;
        },
        (error) => {
          if (error) {
          alert(error);
        }
        });
      }
    }
  }
  public selectedVersionID = null;
  public selectedComponentID = null;
  public inputSubmitter: string = '';
  public inputRootCauseCR: string = '';

  public selectedreadoutLevelID = null;

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
      this.selectedVersionID &&
      this.selectedComponentID &&
      !this.inputSubmitter &&
      !this.inputRootCauseCR &&
      this.selectedreadoutLevelID &&
      this.inputKeywords.length == 0;
  }

  constructor(private filterSrv: FilterService,
    private requestProxyService: RequestProxyService) { }

  loadProductInfo() {
    this.requestProxyService.GetProducts().then((products) => {
      this.impactedProducts = products;
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
    filterCondition.RCAID = this.inputID;

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
    filterCondition.RootCauseCR = this.inputRootCauseCR;
    filterCondition.Submitter = this.inputSubmitter;

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
  }

  ngOnInit() {
    this.loadProductInfo();
    this.loadReadoutLevelInfo();
    this.loadKeyowrdTips();
  }
}
