import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PreventionInfoService } from '@app/services/prevention-info.service';
import { PreventionItem, MainTypeInfo, SubTypeInfo, PreventionStatus} from '@app/entities/prevention';



@Component({
  selector: 'app-prevention-item',
  templateUrl: './prevention-item.component.html',
  styleUrls: ['./prevention-item.component.css']
})
export class PreventionItemComponent implements OnInit {

  @Input() preventionItem: PreventionItem = new PreventionItem();
  @Output() preventionItemChange = new EventEmitter<PreventionItem>();

  @Input() isModified = false;
  @Output() isModifiedChange = new EventEmitter<boolean>();
  @Input() IsReadOnly = false;

  public typeList: MainTypeInfo[] = [];
  public subTypeList: SubTypeInfo[] = [];
  public statusList: PreventionStatus[] = [];
  public oldPrevetionItem: PreventionItem;

  public selectMainTypeName: string;
  public selectSubTypeName: string;
  public selectStatusName: string;

  constructor(private preventionInfoService: PreventionInfoService) { }

  ngOnInit() {
    this.oldPrevetionItem = JSON.parse(JSON.stringify(this.preventionItem));
    this.preventionInfoService.getTypeList().then(
      (mainTypes) => {
        this.typeList = mainTypes;
        if (this.preventionItem.MainTypeID) {
          const selectMainType = this.typeList.find(x => x.ID == this.preventionItem.MainTypeID);
          this.selectMainTypeName =  selectMainType ? selectMainType.Name : '';
        }
      }
    );
    this.preventionInfoService.getPreventionStatuses().then(
      (statuses) => {
        this.statusList = statuses;
        if (this.preventionItem.StatusID) {
          const selectStatus = this.statusList.find(x => x.ID == this.preventionItem.StatusID);
          this.selectStatusName =  selectStatus ? selectStatus.Name : '';
        }
      }
    );
    this.loadSubType(this.preventionItem.MainTypeID);
  }

  get selectedTypeID() {
    return this.preventionItem.MainTypeID;
  }

  set selectedTypeID(value) {
    if (value != this.selectedTypeID) {
      this.preventionItem.MainTypeID = value;
      this.loadSubType(value);
    }
  }

  loadSubType(typeID: string) {
    if (typeID) {
      this.preventionInfoService.getSubTypeList(typeID).then(
        (subTypes) => {
          this.subTypeList = subTypes;
          if (this.preventionItem.SubTypeID) {
            const selectSubType = this.subTypeList.find(x => x.ID == this.preventionItem.SubTypeID);
            this.selectSubTypeName =  selectSubType ? selectSubType.Name : '';
          }
        }
      );
   }
  }

  changePreventionItem() {
    this.checkModify();
    this.preventionItemChange.emit(this.preventionItem);
  }

  checkModify() {
    if (JSON.stringify(this.preventionItem) !== JSON.stringify(this.oldPrevetionItem)) {
      this.isModifiedChange.emit(true);
    } else {
      this.isModifiedChange.emit(false);
    }
  }
}
