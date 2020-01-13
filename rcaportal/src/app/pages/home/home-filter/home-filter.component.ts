import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';
import { FilterCondition } from '@app/entities/filterCondition';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.css']
})
export class HomeFilterComponent implements OnInit {
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
    //filterCondition.ReadoutLevel = ; // TODO: Need to verify with joe and fleix
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
  }
}
