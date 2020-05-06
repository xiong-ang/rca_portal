import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PreventionItem, PreventionType} from '@app/entities/prevention';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { PreventionInfoService } from '@app/services/prevention-info.service';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.component.html',
  styleUrls: ['./prevention.component.css']
})
export class PreventionComponent implements OnInit, OnDestroy {

  constructor(private requestProxyService: RequestProxyService,
              private preventionInfoService: PreventionInfoService) { }

  @Input() isModified = false;
  @Output() isModifiedChange = new EventEmitter<boolean>();
  @Input() isDataLegal = true;
  @Output() isDataLegalChange = new EventEmitter<boolean>();
  @Input() isLoaded = false;
  @Output() isLoadedChange = new EventEmitter<boolean>();
  @Input() refreshEvent: Observable<void> = new Observable<void>();
  @Output() ApplyDone = new EventEmitter();

  @Input() preventionType: string;
  @Input() IsReadOnly = false;
  @Input() set RCAID(value) {
    this.rcaID = value;
    if (value) {
    // To DO
    }
  }

  get RCAID() {
    return this.rcaID;
  }

  @Input() set Apply(value) {
    this.apply = value;
    if(value == true) {
      this.doAction();
    }
  }

  get Apply() {
    return this.apply;
  }

  private updateEventSubscription: Subscription = new Subscription();

  private rcaID = '';
  private apply = false;

  preventionTypeID = '';
  delHoverIndex: number = null;
  delHoverIndexLocal: number = null;
  preventionList: PreventionItem[] = [];
  oldPreventionList: PreventionItem[] = [];
  modifyFlagList: boolean[] = [];
  deleteList: string[] = [];
  addList: PreventionItem[] = [];

  asnyTaskArry: any[] = [];

  ngOnInit() {
    this.updateEventSubscription = this.refreshEvent.subscribe(() => this.refreshPrevention());
    this.preventionTypeID = this.preventionInfoService.getPreventionTypeID(this.preventionType);
    this.refreshPrevention();
  }

  ngOnDestroy(): void {
    this.updateEventSubscription.unsubscribe();
  }

  refreshPrevention() {
    if (this.RCAID) {
      this.requestProxyService.GetPrevention(this.RCAID, this.preventionTypeID ).then(
        PreventionList => {
          this.preventionList =  PreventionList;
          this.preventionList.forEach( x => {
            this.oldPreventionList.push(JSON.parse(JSON.stringify(x)));
          });
          this.isLoadedChange.emit(true);
        }
      );
    } else {
      this.isLoadedChange.emit(true);
    }
  }

  onDelete(index: number) {
    if (index >= 0) {
      this.deleteList.push(this.preventionList[index].ID);
      this.preventionList.splice(index, 1);
      this.modifyFlagList.splice(index, 1);
      this.checkModified();
    }
  }

  onChange() {
    this.checkModified();
  }

  checkUpdate(): boolean {
    if (this.modifyFlagList.indexOf(true) > -1) {
      return true;
    } else {
      return false;
    }
  }

  checkModified() {
    // To do
    if ((this.addList.length != 0 || this.deleteList.length != 0 || this.checkUpdate()) && this.isAllDataLegal()) {
      this.isModifiedChange.emit(true);
    } else {
      this.isModifiedChange.emit(false);
    }

    if(this.isAllDataLegal) {
      this.isDataLegalChange.emit(true);
    } else {
      this.isDataLegalChange.emit(false);
    }
  }

  isAllDataLegal() {
    if (this.addList.find(element => element.MainTypeID === '' || element.SubTypeID === '' || element.Details === '')) {
      return false;
    }
    if (this.preventionList.find(element => element.MainTypeID === '' || element.SubTypeID === '' || element.Details === '')) {
      return false;
    }
    return true;
  }

  get isAllowAddNew() {
    if ((this.addList.length + this.preventionList.length) >= 3) {
      return false;
    }
    if (!this.isAllDataLegal()) {
      return false;
    }
    return true;
  }

  mouseEnterDel(index: number) {
    // console.log("mouseEnterDel call");
    this.delHoverIndex = index;
  }

  mouseLeaveDel(index: number) {
    // console.log("mouseLeaveDel call");
    this.delHoverIndex = null;
  }

  // Local cache handle.
  onAdd() {
    const newPrevention = new PreventionItem();
    this.addList.push(newPrevention);
    this.checkModified();
  }

  onDeleteLocal(index: number) {
    if (index >= 0) {
      this.addList.splice(index, 1);
      this.checkModified();
    }
  }

  mouseEnterDelLocal(index: number) {
    //console.log("mouseEnterDelLocal call");
    this.delHoverIndexLocal = index;
  }

  mouseLeaveDelLocal(index: number) {
    //console.log("mouseLeaveDelLocal call");
    this.delHoverIndexLocal = null;
  }

  addTaskMakeUp() {
    if (this.addList.length > 0) {
      this.addList.forEach( (Item) => {
        const request = this.requestProxyService.AddPrevention(this.RCAID, Item, this.preventionTypeID).then(
          bSuccess => {
            // To do
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
        this.asnyTaskArry.push(request);
      });
    }
  }

  deleteTaskMakeUp() {
    if (this.deleteList.length > 0) {
      this.deleteList.forEach( (ID) => {
        const request = this.requestProxyService.DeletePrevention(this.RCAID, ID).then(
          bSuccess => {
            // To do
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
        this.asnyTaskArry.push(request);
      });
    }
  }

  updateTaskMakeUp() {
    if (this.modifyFlagList.length > 0) {
      this.modifyFlagList.forEach( (value, index) => {
        if(value == true) {
         const body = this.buildUpdateBody(this.oldPreventionList[index], this.preventionList[index]);
         const request = this.requestProxyService.UpdatePrevention(this.RCAID, this.oldPreventionList[index].ID, body).then(
          bSuccess => {
            // To do
          },
          (error) => {
            if (error) {
              alert(error);
            }
          }
        );
         this.asnyTaskArry.push(request);
      }
    });
    }
  }

  doAllTask() {
    Promise.all(this.asnyTaskArry).then((results) => {
      this.ApplyDone.emit();
    });
  }

  doAction() {
    this.addTaskMakeUp();
    this.deleteTaskMakeUp();
    this.updateTaskMakeUp();
    this.doAllTask();
  }

  buildUpdateBody(oldOne: PreventionItem, newOne: PreventionItem) {
    const body: any = {};
    if (newOne.MainTypeID !== oldOne.MainTypeID) {
      body.MainTypeID = newOne.MainTypeID;
    }
    if (newOne.SubTypeID !== oldOne.SubTypeID) {
      body.SubTypeID = newOne.SubTypeID;
    }
    if (newOne.Details !== oldOne.Details) {
      body.Details = newOne.Details;
    }
    return body;
  }
}
