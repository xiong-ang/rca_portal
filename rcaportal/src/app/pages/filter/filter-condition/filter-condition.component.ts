import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';


@Component({
  selector: 'app-filter-condition',
  templateUrl: './filter-condition.component.html',
  styleUrls: ['./filter-condition.component.css']
})
export class FilterConditionComponent implements OnInit {
  public isDetailFilterPanelOpen = false;
  impactedProducts = [];
  fixVersionList: string[] = [];
  componentList: string[] = [];


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
  private selectedVersions = [];
  private selectedComponents = [];
  public inputSubmitter: string = '';
  public inputRootCauseCR: string = '';

  // TODO: Need to verify with joe and fleix
  isReadoutChecked = true;
  isNotReadoutChecked = true;

  public inputKeywords: string = '';

  get isNothingInput() {
    return !this.inputID &&
      !this.selectedProduct &&
      this.selectedVersions.length == 0 &&
      this.selectedComponents.length == 0 &&
      !this.inputSubmitter &&
      !this.inputRootCauseCR;
    // !this.inputIsReadout && //TODO
    // !this.inputKeywords; //TODO
  }

  constructor(private filterSrv: FilterService,
    private requestProxyService: RequestProxyService) { }

  loadProductInfo() {
    this.requestProxyService.GetProducts().then(productNames => {
      this.impactedProducts = productNames;
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
    filterCondition.ID = this.inputID;
    filterCondition.ImpactedProduct = this.selectedProduct;
    filterCondition.Components = this.selectedComponents;
    filterCondition.FixVersions = this.selectedVersions;
    //filterCondition.IsReadout = ; // TODO: Need to verify with joe and fleix 
    //filterCondition.Keywords = ; // TODO: Need to implement
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
    //TODO: Clear isReadout
    this.inputKeywords = '';
  }

  ngOnInit() {
    this.loadProductInfo();

    this.initDetailData();

    this.initChipsData();

    this.filterSrv.filterConditionChangeEvent.subscribe(() => {
      this.initDetailData();

      this.initChipsData();
    });
  }

  initDetailData() {
    let initFilterCondition = this.filterSrv.currentFilterCondition;

    this.inputID = initFilterCondition.ID;
    this.selectedProduct = initFilterCondition.ImpactedProduct;
    this.selectedVersions = initFilterCondition.FixVersions;
    this.selectedComponents = initFilterCondition.Components;
    this.inputSubmitter = initFilterCondition.Submitter;
    this.inputRootCauseCR = initFilterCondition.RootCauseCR;
    // TODO: Clear isReadout
    // this.inputKeywords = initFilterCondition.Keywords; // TODO
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

    if (initFilterCondition.ID) {
      this.coditions.push(new ChipCondition('ID', initFilterCondition.ID, 'accent'));
      return;
    }

    if (initFilterCondition.ImpactedProduct) {
      this.coditions.push(new ChipCondition('IMPACTED PRODUCT', initFilterCondition.ImpactedProduct, 'accent'));
    }

    if (initFilterCondition.FixVersions && initFilterCondition.FixVersions.length > 0) {
      this.coditions.push(new ChipCondition('FIX VERSIONS', initFilterCondition.FixVersions, 'primary'));
    }

    if (initFilterCondition.Components && initFilterCondition.Components.length > 0) {
      this.coditions.push(new ChipCondition('COMPONENTS', initFilterCondition.Components, 'primary'));
    }

    if (initFilterCondition.Submitter) {
      this.coditions.push(new ChipCondition('SUBMITTER', initFilterCondition.Submitter, 'warn'));
    }

    if (initFilterCondition.RootCauseCR) {
      this.coditions.push(new ChipCondition('ROOT CAUSE CR', initFilterCondition.RootCauseCR, 'warn'));
    }

    // TODO: Clear isReadout
    // this.inputKeywords = initFilterCondition.Keywords; // TODO

    // TODO: Quick search
  }

  remove(codition): void {
    const index = this.coditions.indexOf(codition);
    if (index >= 0) {
      this.coditions.splice(index, 1);

      //TODO: Open filter result page
    }
  }

  inputQuickSearch: string = '';
  quickSearch(): void {

    if ((this.inputQuickSearch || '').trim()) {
      //TODO: Open filter result page
    }

    this.inputQuickSearch = '';
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
