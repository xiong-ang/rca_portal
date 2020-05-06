import { Injectable, OnInit } from '@angular/core';
import { MainTypeInfo, SubTypeInfo} from '@app/entities/prevention';
import { RequestProxyService } from '@app/services/httpRequest/request-proxy.service';
import { PreventionType } from '@app/entities/prevention';


@Injectable({
  providedIn: 'root'
})
export class PreventionInfoService {

constructor( private requestProxyService: RequestProxyService) {
  requestProxyService.GetPreventionMainTypes().then(
    MainTypes => {
      this.typeList = MainTypes;
    }
  );
  requestProxyService.GetPreventionSubTypes().then(
    SubTypes => {
      this.subTypeList = SubTypes;
    }
  );
  requestProxyService.GetPrevetionTypes().then(
    PreventionTypes => {
      this.preventionTypeList = PreventionTypes;
    }
  )
}

private typeList: MainTypeInfo[] = [];
private subTypeList: SubTypeInfo[] = [];
private preventionTypeList: PreventionType[] = [];

getTypeList() {
  return this.typeList;
}

getSubTypeList(mainType: string) {
  return this.subTypeList.filter(x => x.MainTypeID == mainType);
}

getPreventionTypeID(typeName: string) {
  return this.preventionTypeList.find(x => x.Name == typeName) ? this.preventionTypeList.find(x => x.Name == typeName).ID : '';
}
}
