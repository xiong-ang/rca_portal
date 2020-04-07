import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RCAItem } from '@app/entities/rcaItem';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
import { AuthenticationService } from '@app/services/authentication.service';
import { RcaDialogService } from 'src/app/services/rca-dialog.service';
import { RcaDetailService } from 'src/app/services/rca-detail.service';

export interface RCADialogData {
  type: string;
  rcaID: string;
  okAction: any;
  cancelAction: any;
}

@Component({
  selector: 'app-rca-dialog',
  templateUrl: './rca-dialog.component.html',
  styleUrls: ['./rca-dialog.component.css']
})
export class RcaDialogComponent implements OnInit {
  public get isCreateMode(): boolean { return this.data.type == 'Create'; }
  public get dialogTitle(): string { return this.isCreateMode ? 'Create a new RCA' : 'Update RCA'; }

  public get isFirstLoading(): boolean {
    return this.isKeywordLoading ||
      this.isProductLoading ||
      this.isAttachmentLoading ||
      this.isReadOutLevelLoading;
  }
  rcaData: RCAItem = new RCAItem();
  oldRcaData: RCAItem = new RCAItem();
  impactedProducts: ProductInfo[] = [];
  readoutLevels: ReadoutInfo[] = [];
  fixVersionList: VersionInfo[] = [];
  componentList: ComponentInfo[] = [];
  isFixVersionListReady = false;
  isComponentListReady = false;
  keyWordCtrl = new FormControl();

  isRequirementPanelOpen = false;
  isDevPanelOpen = false;
  isTestPanelOpen = false;


  isKeywordLoading = true;
  isProductLoading = true;
  isAttachmentLoading = false;
  isAttachmentModified = false;
  isReadOutLevelLoading = true;

  isCreating = false;
  isUpdating = false;

  filteredKeyWords: Observable<string[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allKeywords: string[] = [];
  keyWordTips: string[] = [];
  @ViewChild('keyWordInput', { static: false }) keyWordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  public applyAttachmentChangeSubject: Subject<string> = new Subject<string>();

  constructor(
    private rcaDialogSrv: RcaDialogService,
    private rcaDetailSrv: RcaDetailService,
    public dialogRef: MatDialogRef<RcaDialogComponent>,
    private requestProxyService: RequestProxyService,
    @Inject(MAT_DIALOG_DATA) public data: RCADialogData,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loadProductInfo();
    this.loadKeywordAndTips();
    this.loadReadOutInfo();

    if (this.data.type === 'Update') {
      this.isAttachmentLoading = true;
      this.requestProxyService.GetRCA(this.data.rcaID).then(rcaInfo => {
      this.rcaData = rcaInfo;
      this.oldRcaData = JSON.parse(JSON.stringify(rcaInfo));
      this.loadVersionsAndComponents();
    });
  } else {
    this.rcaData.Submitter = this.authenticationService.currentUserName;
    this.rcaData.ReadoutLevelID = '84688BFC-C622-4499-BC3D-334F00646969';
  }

  }

  get isAllowCreate() {
    return this.rcaData.RCAID.length !== 0 &&
      this.rcaData.Header.length !== 0 &&
      this.rcaData.Submitter.length !== 0 &&
      this.rcaData.KeyWords.length !== 0 &&
      this.rcaData.RootCauseAnalyze &&
      this.rcaData.RootCauseAnalyze.length !== 0 &&
      this.rcaData.FixVersionID.length !== 0 &&
      this.rcaData.ImpactedProductID.length !== 0 &&
      this.rcaData.ComponentID.length !== 0;
    //To do
  }

  get isAllowUpdate() {
    return (JSON.stringify(this.rcaData) !== JSON.stringify(this.oldRcaData) || this.isAttachmentModified) && this.isAllowCreate;
    //To do
  }

  get selectedProductID() { return this.rcaData.ImpactedProductID; }
  set selectedProductID(value) {

    if (value != this.rcaData.ImpactedProductID) {
      this.isComponentListReady = false;
      this.isFixVersionListReady = false;
      this.rcaData.FixVersionID = '';
      this.rcaData.ComponentID = '';
      this.rcaData.ImpactedProductID = value;
      if(this.selectedProductID){
        this.loadVersionsAndComponents();
      }
    }
  }
  loadProductInfo() {
    this.requestProxyService.GetProducts()
      .then((productNames) => {
        this.impactedProducts = productNames;
        this.isProductLoading = false;
      },
        (error) => {
          this.isProductLoading = false;
          if (error) {
          alert(error);
        }
        })
      .catch(error => console.log(error));
  }
  loadReadOutInfo() {
    this.requestProxyService.GetReadOutLevels().then(readoutLevels => {
      this.readoutLevels = readoutLevels;
      this.isReadOutLevelLoading = false;
    },
      (error) => {
        this.isReadOutLevelLoading = false;
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
      this.isKeywordLoading = false;
    },
      (error) => {
        this.isKeywordLoading = false;
        if (error) {
          alert(error);
        }
      });
  }

  loadVersionsAndComponents() {
    this.fixVersionList = [];
    this.requestProxyService.GetProductVersions(this.selectedProductID).then(versions => {
      this.fixVersionList = versions;
      this.isFixVersionListReady = true;
    },
      (error) => {
        if (error) {
          alert(error);
        }
      });

    this.componentList = [];
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

  AttachmentLoaded() {
    this.isAttachmentLoading = false;
  }

  AttachmentApplyDone() {
    this.isCreating = false;
    this.isUpdating = false;

    if (this.isCreateMode) {
      this.rcaDialogSrv.openMsgDialog('info', `Create ${this.rcaData.RCAID} successfully, Do you want to view it now?`).then((bOk) => {
        if (bOk) {
          this.rcaDetailSrv.openRCADetail(this.rcaData.ID);
        }
      });
    }

    this.dialogRef.close();
    this.data.okAction();
  }

  AttachmentModified(bModified: boolean) {
    this.isAttachmentModified = bModified;
  }

  endInput(event: MatChipInputEvent): void {
    // Clear input only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
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

  remove(keyword: string): void {
    const index = this.rcaData.KeyWords.indexOf(keyword);

    if (index >= 0) {
      this.rcaData.KeyWords.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addKeyWord(event.option.viewValue);

    this.keyWordCtrl.setValue(''); // filter
    this.keyWordInput.nativeElement.value = '';
    this.keyWordInput.nativeElement.blur();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter(keyword => keyword.toLowerCase().indexOf(filterValue) === 0);
  }

  OnClickKeyWordTip(keyWord: string) {
    this.addKeyWord(keyWord);
  }

  addKeyWord(keyWord: string): void {
    if(this.rcaData.KeyWords.includes(keyWord)) {
        this.rcaDialogSrv.openMsgDialog('warning', 'Duplicate keyword!', false);
        return;
    } else if (!(this.rcaData.KeyWords.length < 3)){
        this.rcaDialogSrv.openMsgDialog('warning', 'The number of keywords cannot exceed 3!', false);
        return;
    } else {
      this.rcaData.KeyWords.push(keyWord);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.data.cancelAction();
  }

  onCreateClick(): void {
    this.isCreating = true;
    this.rcaData.RCAID = this.rcaData.RCAID && this.rcaData.RCAID.trim();
    this.rcaData.Header = this.rcaData.Header && this.rcaData.Header.trim();
    this.rcaData.RootCauseCR = this.rcaData.RootCauseCR && this.rcaData.RootCauseCR.trim();
    this.rcaData.Submitter = this.rcaData.Submitter && this.rcaData.Submitter.trim();
    this.requestProxyService.CreateRCA(this.rcaData).then(
      (ID) => {
        this.rcaData.ID = ID;
        if (this.isAttachmentModified) {
          this.applyAttachmentChangeSubject.next(ID);
        } else {
          this.AttachmentApplyDone();
        }
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  onUpdateClick(): void {
    this.rcaDialogSrv.openMsgDialog('warning', 'Do you want to apply the changes?').then((bOk) => {
      if (bOk) {
        this.doUpdate();
      }
    });
  }

  doUpdate(): void {
    this.isUpdating = true;
    this.rcaData.RCAID = this.rcaData.RCAID && this.rcaData.RCAID.trim();
    this.rcaData.Header = this.rcaData.Header && this.rcaData.Header.trim();
    this.rcaData.RootCauseCR = this.rcaData.RootCauseCR && this.rcaData.RootCauseCR.trim();
    this.rcaData.Submitter = this.rcaData.Submitter && this.rcaData.Submitter.trim();
    this.requestProxyService.UpdateRCA(this.rcaData.ID, this.FindUpdate(this.rcaData, this.oldRcaData)).then(
      () => {
        if (this.isAttachmentModified) {
          this.applyAttachmentChangeSubject.next(this.rcaData.ID);
        } else {
          this.AttachmentApplyDone();
        }
      },
      (error) => {
        if (error) {
          alert(error);
        }
      });
  }

  FindUpdate(newOne: RCAItem, oldOne: RCAItem) {
    const body: any = {};
    if (newOne.RCAID !== oldOne.RCAID) {
      body.RCAID = newOne.RCAID;
    }
    if (newOne.Header !== oldOne.Header) {
      body.Header = newOne.Header;
    }
    if (newOne.ImpactedProductID !== oldOne.ImpactedProductID) {
      body.ImpactedProductID = newOne.ImpactedProductID;
    }
    if (newOne.FixVersionID !== oldOne.FixVersionID) {
      body.FixedVersionID = newOne.FixVersionID;
    }
    if (newOne.ComponentID !== oldOne.ComponentID) {
      body.ComponentID = newOne.ComponentID;
    }
    if (newOne.KeyWords.toString() !== oldOne.KeyWords.toString()) {
      body.Keywords = newOne.KeyWords.toString();
    }
    if (newOne.ReadoutLevelID !== oldOne.ReadoutLevelID) {
      body.ReadoutLevelID = newOne.ReadoutLevelID;
    }
    if (newOne.RootCauseCR !== oldOne.RootCauseCR) {
      body.RootCauseCR = newOne.RootCauseCR;
    }
    if (newOne.RootCauseAnalyze !== oldOne.RootCauseAnalyze) {
      if (newOne.RootCauseAnalyze === null) {
        newOne.RootCauseAnalyze = '';
      }
      body.RootCauseAnalyze = newOne.RootCauseAnalyze;
    }
    if (newOne.RequirementCorrectAndPrevention.RootCause !== oldOne.RequirementCorrectAndPrevention.RootCause) {
      if (newOne.RequirementCorrectAndPrevention.RootCause === null) {
        newOne.RequirementCorrectAndPrevention.RootCause = '';
      }
      body.RequirementRootCause = newOne.RequirementCorrectAndPrevention.RootCause;
    }
    if (newOne.RequirementCorrectAndPrevention.Correction !== oldOne.RequirementCorrectAndPrevention.Correction) {
      if (newOne.RequirementCorrectAndPrevention.Correction === null) {
        newOne.RequirementCorrectAndPrevention.Correction = '';
      }
      body.RequirementCorrection = newOne.RequirementCorrectAndPrevention.Correction;
    }
    if (newOne.RequirementCorrectAndPrevention.Prevention !== oldOne.RequirementCorrectAndPrevention.Prevention) {
      if (newOne.RequirementCorrectAndPrevention.Prevention === null) {
        newOne.RequirementCorrectAndPrevention.Prevention = '';
      }
      body.RequirementPrevention = newOne.RequirementCorrectAndPrevention.Prevention;
    }
    if (newOne.DevCorrectAndPrevention.RootCause !== oldOne.DevCorrectAndPrevention.RootCause) {
      if (newOne.DevCorrectAndPrevention.RootCause === null) {
        newOne.DevCorrectAndPrevention.RootCause = '';
      }
      body.DevRootCause = newOne.DevCorrectAndPrevention.RootCause;
    }
    if (newOne.DevCorrectAndPrevention.Correction !== oldOne.DevCorrectAndPrevention.Correction) {
      if (newOne.DevCorrectAndPrevention.Correction === null) {
        newOne.DevCorrectAndPrevention.Correction = '';
      }
      body.DevCorrection = newOne.DevCorrectAndPrevention.Correction;
    }
    if (newOne.DevCorrectAndPrevention.Prevention !== oldOne.DevCorrectAndPrevention.Prevention) {
      if (newOne.DevCorrectAndPrevention.Prevention === null) {
        newOne.DevCorrectAndPrevention.Prevention = '';
      }
      body.DevPrevention = newOne.DevCorrectAndPrevention.Prevention;
    }
    if (newOne.TestCorrectAndPrevention.RootCause !== oldOne.TestCorrectAndPrevention.RootCause) {
      if (newOne.TestCorrectAndPrevention.RootCause === null) {
        newOne.TestCorrectAndPrevention.RootCause = '';
      }
      body.TestRootCause = newOne.TestCorrectAndPrevention.RootCause;
    }
    if (newOne.TestCorrectAndPrevention.Correction !== oldOne.TestCorrectAndPrevention.Correction) {
      if (newOne.TestCorrectAndPrevention.Correction === null) {
        newOne.TestCorrectAndPrevention.Correction = '';
      }
      body.TestCorrection = newOne.TestCorrectAndPrevention.Correction;
    }
    if (newOne.TestCorrectAndPrevention.Prevention !== oldOne.TestCorrectAndPrevention.Prevention) {
      if (newOne.TestCorrectAndPrevention.Prevention === null) {
        newOne.TestCorrectAndPrevention.Prevention = '';
      }
      body.TestPrevention = newOne.TestCorrectAndPrevention.Prevention;
    }
    return body;
  }

}
