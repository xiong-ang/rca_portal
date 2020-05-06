import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PreventionInfoService } from '@app/services/prevention-info.service';
import { PreventionItem, MainTypeInfo, SubTypeInfo} from '@app/entities/prevention';



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
  public oldPrevetionItem: PreventionItem;

  public selectMainTypeName: string;
  public selectSubTypeName: string;

  constructor(private preventionInfoService: PreventionInfoService) { }

  ngOnInit() {
    this.oldPrevetionItem = JSON.parse(JSON.stringify(this.preventionItem));
    this.typeList = this.preventionInfoService.getTypeList();
    this.loadSubType(this.preventionItem.MainTypeID);
    this.transIDToName();
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

  transIDToName() {
    if (this.preventionItem.MainTypeID) {
      const selectMainType = this.typeList.find(x => x.ID == this.preventionItem.MainTypeID);
      this.selectMainTypeName =  selectMainType ? selectMainType.Name : '';
    }
    if (this.preventionItem.SubTypeID) {
      const selectSubType = this.subTypeList.find(x => x.ID == this.preventionItem.SubTypeID);
      this.selectSubTypeName =  selectSubType ? selectSubType.Name : '';
    }
  }

  loadSubType(typeID: string) {
    if (typeID) {
      this.subTypeList = this.preventionInfoService.getSubTypeList(typeID);
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
