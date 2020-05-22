import { Injectable, OnInit } from '@angular/core';
import { MainTypeInfo, SubTypeInfo, PreventionStatus} from '@app/entities/prevention';
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
  );
  requestProxyService.GetPreventionStatuses().then(
    Statuses => {
      this.preventionStatusList = Statuses;
    }
  );
}

private typeList: MainTypeInfo[] = [];
private subTypeList: SubTypeInfo[] = [];
private preventionStatusList: PreventionStatus[] = [];
private preventionTypeList: PreventionType[] = [];

getTypeList(): Promise<MainTypeInfo[]> {
  return new Promise((resolve, reject) => {
    if (this.typeList) {
      resolve(this.typeList);
    } else {
      this.requestProxyService.GetPreventionMainTypes().then(
        MainTypes => {
          this.typeList = MainTypes;
          resolve(this.typeList);
        }
      );
    }
  });
}

getSubTypeList(mainType: string): Promise<SubTypeInfo[]>  {
  return new Promise((resolve, reject) => {
    if (this.subTypeList) {
      resolve(this.subTypeList.filter(x => x.MainTypeID == mainType));
    } else {
      this.requestProxyService.GetPreventionSubTypes().then(
        SubTypes => {
          this.subTypeList = SubTypes;
          resolve(this.subTypeList.filter(x => x.MainTypeID == mainType));
        }
      );
    }
  });
}

getPreventionTypeID(typeName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (this.preventionTypeList) {
      resolve(this.preventionTypeList.find(x => x.Name == typeName) ? this.preventionTypeList.find(x => x.Name == typeName).ID : '');
    } else {
      this.requestProxyService.GetPrevetionTypes().then(
        PreventionTypes => {
          this.preventionTypeList = PreventionTypes;
          resolve(this.preventionTypeList.find(x => x.Name == typeName) ? this.preventionTypeList.find(x => x.Name == typeName).ID : '');
        }
      );
    }
  });
}

getPreventionStatuses(): Promise<PreventionStatus[]> {
  return new Promise((resolve, reject) => {
    if (this.preventionStatusList) {
      resolve(this.preventionStatusList);
    } else {
      this.requestProxyService.GetPreventionStatuses().then(
        Statuses => {
          this.preventionStatusList = Statuses;
          resolve(this.preventionStatusList);
        }
      );
    }
  });
}

}
