import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatChipInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
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
      this.clearVersAndCompInfo();
      if (this.selectedProductID) {
        this.requestProxyService.GetProductVersions(this.selectedProductID).then(versions => {
          this.fixVersionList = versions;
          this.isFixVersionListReady = true;
        },
        (error) => {
          if (error) {
          alert(error);
        }
        });
        this.requestProxyService.GetProductComponents(this.selectedProductID).then(components => {
          this.componentList = components;
          this.isComponentListReady = true;
        },
        (error) => {
          if (error) {
          alert(error);
        }
        });
      }
    }
  }

  @ViewChild('keyWordInput', { static: false }) keyWordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  keyWordCtrl = new FormControl();
  filteredKeyWords: Observable<string[]>;
  public inputKeywords: string[] = [];
  public keyWordTips: string[] = [];
  public allKeywords: string[] = [];

  public selectedVersionID = null;
  public selectedComponentID = null;
  public inputSubmitter: string = '';
  public inputRootCauseCR: string = '';
  public isComponentListReady = false;
  public isFixVersionListReady = false;

  public selectedreadoutLevelID = null;

  endInput(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      
      this.keyWordCtrl.setValue('');
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  removeKeyword(Keyword: string): void {
    const index = this.inputKeywords.indexOf(Keyword);

    if (index >= 0) {
      this.inputKeywords.splice(index, 1);
    }
  }

  keyword_tip_click(keywordTip: string) {
    if(this.isInputIDEmpty ) {
      this.addKeyWord(keywordTip);
    }
  }

  get isInputIDEmpty() {
    return (this.inputID || '').length == 0;
  }

  get isVersionEnable() {
    return this.isFixVersionListReady && this.isInputIDEmpty;
  }

  get isComponentEnable() {
    return this.isComponentListReady && this.isInputIDEmpty;
  }

  get isNothingInput() {
    return !this.inputID &&
      !this.selectedProductID &&
      !this.selectedVersionID &&
      !this.selectedComponentID &&
      !this.inputSubmitter &&
      !this.inputRootCauseCR &&
      !this.selectedreadoutLevelID &&
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

  clearVersAndCompInfo(){
    this.fixVersionList = [];
    this.componentList = [];
    this.selectedComponentID = null;
    this.selectedVersionID = null;
    this.isFixVersionListReady = false;
    this.isComponentListReady =  false;
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

  loadKeywordAndTips() {
    this.allKeywords = [];
    this.keyWordTips = [];
    this.requestProxyService.GetHotKeywords(1, -1).then(hotKeywords => {
      hotKeywords.forEach((keyword, index) => {
        this.allKeywords.push(keyword.KeywordValue);
        if (index < 10) {
          this.keyWordTips.push(keyword.KeywordValue);
        }
      });
      this.allKeywords.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      this.filteredKeyWords = this.keyWordCtrl.valueChanges.pipe(
        startWith(null),
        map((keyWord: string | null) => keyWord ? this._filter(keyWord) : this.allKeywords.slice()));
    },
    (error) => {
      if (error) {
          alert(error);
        }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter(keyword => keyword.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addKeyWord(event.option.viewValue);
    this.keyWordCtrl.setValue(''); // filter
    this.keyWordInput.nativeElement.value = ''; 
    this.keyWordInput.nativeElement.blur();
  }

  addKeyWord(keyWord: string): void {
    if (this.isInputIDEmpty && (keyWord || '').trim() &&
      !this.inputKeywords.includes(keyWord) &&
      this.inputKeywords.length < 3) {
      this.inputKeywords.push(keyWord.trim());
    }
  }


  triggerDetailFilterPanel() {
    this.isDetailFilterPanelOpen = !this.isDetailFilterPanelOpen;
  }

  onCancel() {
    this.isDetailFilterPanelOpen = false;
    this.clear();
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
    this.loadKeywordAndTips();
  }
}
