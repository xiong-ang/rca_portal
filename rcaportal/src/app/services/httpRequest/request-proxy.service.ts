import { Injectable } from '@angular/core';
import { IHttpRequester } from '@app/interfaces/IHttpRequester';
import { HttpRequesterMockService } from './http-requester.mock.service';
import { HttpRequesterService } from './http-requester.service';
import { HotKeyword } from '@app/entities/hotKeyword';
import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
import { PreventionType, PreventionItem, MainTypeInfo, SubTypeInfo, PreventionStatus} from '@app/entities/prevention';

@Injectable({
  providedIn: 'root'
})
export class RequestProxyService implements IHttpRequester{
  private isMock = false;
  private requestService: IHttpRequester;
  constructor(private httpRequesterService: HttpRequesterService,
    private httpRequesterMockService: HttpRequesterMockService) {

      this.requestService = this.isMock ? this.httpRequesterMockService: this.httpRequesterService;
  }

  GetProducts(): Promise<ProductInfo[]> {
    return this.requestService.GetProducts();
  }
  GetProductVersions(productID: string): Promise<VersionInfo[]> {
    return this.requestService.GetProductVersions(productID);
  }
  GetProductComponents(productID: string): Promise<ComponentInfo[]> {
    return this.requestService.GetProductComponents(productID);
  }
  GetReadOutLevels(): Promise<ReadoutInfo[]>{
    return this.requestService.GetReadOutLevels();
  }
  UploadAttachment(rcaID: string, formData: any): Promise<boolean> {
    return this.requestService.UploadAttachment(rcaID, formData);
  }
  GetAttachments(rcaID: string): Promise<Attachment[]> {
    return this.requestService.GetAttachments(rcaID);
  }
  DeleteAttachment(rcaID: string, attachmentID: string): Promise<boolean>{
    return this.requestService.DeleteAttachment(rcaID, attachmentID);
  }
  GetAttachment( path: string): Promise<any> {
    return this.requestService.GetAttachment(path);
  }
  CreateRCA(newRCA: RCAItem): Promise<string> {
    return this.requestService.CreateRCA(newRCA);
  }
  DeleteRCA(RCAID: string): Promise<boolean> {
    return this.requestService.DeleteRCA(RCAID);
  }
  UpdateRCA(RCAID: string, updateRCA: any): Promise<boolean> {
    return this.requestService.UpdateRCA(RCAID, updateRCA);
  }
  GetRCA(RCAID: string): Promise<RCAItem> {
    return this.requestService.GetRCA(RCAID);
  }
  GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<RCAItem[]> {
    return this.requestService.GetRCAs(filterCondition, start, count);
  }
  GetHotRCAs(start: number, count: number): Promise<RCAItem[]> {
    return this.requestService.GetHotRCAs(start, count);
  }
  GetHotKeywords(start: number, count: number): Promise<HotKeyword[]> {
    return this.requestService.GetHotKeywords(start, count);
  }
  PostRCAClickEvent(RCAID: string): Promise<boolean> {
    return this.requestService.PostRCAClickEvent(RCAID);
  }

  GetPrevetionTypes(): Promise<PreventionType[]> {
    return this.requestService.GetPrevetionTypes();
  }
  GetPreventionMainTypes(): Promise<MainTypeInfo[]> {
    return this.requestService.GetPreventionMainTypes();
  }
  GetPreventionSubTypes(): Promise<SubTypeInfo[]> {
    return this.requestService.GetPreventionSubTypes();
  }
  GetPreventionStatuses(): Promise<PreventionStatus[]> {
    return this.requestService.GetPreventionStatuses();
  }
  GetPrevention(rcaID: string, typeID: string): Promise<PreventionItem[]> {
    return this.requestService.GetPrevention(rcaID,typeID);
  }
  AddPrevention(rcaID: string, preventionItem: PreventionItem, typeID: string): Promise<boolean> {
    return this.requestService.AddPrevention(rcaID, preventionItem, typeID);
  }
  DeletePrevention(rcaID: string, preventionID: string): Promise<boolean> {
    return this.requestService.DeletePrevention(rcaID, preventionID);
  }
  UpdatePrevention(rcaID: string, preventionID: string, updateBody: any): Promise<boolean> {
    return this.requestService.UpdatePrevention(rcaID, preventionID, updateBody);
  }

  // Add
  AddKeyword(keyWord: string): Promise<boolean> {
    return this.requestService.AddKeyword(keyWord);
  }
  AddProduct(productName: string): Promise<boolean> {
    return this.requestService.AddProduct(productName);
  }
  AddComponent(productID: string, componentName: string): Promise<boolean> {
    return this.requestService.AddComponent(productID, componentName);
  }
  AddVersion(productID: string, versionName: string): Promise<boolean> {
    return this.requestService.AddVersion(productID, versionName);
  }

}
