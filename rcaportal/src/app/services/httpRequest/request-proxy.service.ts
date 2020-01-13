import { Injectable } from '@angular/core';
import { IHttpRequester } from '@app/interfaces/IHttpRequester';
import { HttpRequesterMockService } from './http-requester.mock.service';
import { HttpRequesterService } from './http-requester.service';
import { HotKeyword } from '@app/entities/hotKeyword';
import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';

@Injectable({
  providedIn: 'root'
})
export class RequestProxyService implements IHttpRequester{
  private isMock = true;
  private requestService: IHttpRequester;
  constructor(private httpRequesterService: HttpRequesterService,
    private httpRequesterMockService: HttpRequesterMockService) {

      this.requestService = this.isMock ? this.httpRequesterMockService: this.httpRequesterService;
  }

  GetProducts(): Promise<string[]> {
    return this.requestService.GetProducts();
  }
  GetReadOutLevels(): Promise<string[]> {
    return this.requestService.GetReadOutLevels();
  }
  GetProductVersions(productName: string): Promise<string[]> {
    return this.requestService.GetProductVersions(productName);
  }
  GetProductComponents(productName: string): Promise<string[]> {
    return this.requestService.GetProductComponents(productName);
  }
  UploadAttachment(rawData: any): Promise<Attachment> {
    return this.requestService.UploadAttachment(rawData);
  }
  GetAttachment(attachmentID: string): Promise<any> {
    return this.requestService.GetAttachment(attachmentID);
  }
  CreateRCA(newRCA: RCAItem): Promise<boolean> {
    return this.requestService.CreateRCA(newRCA);
  }
  DeleteRCA(RCAID: string): Promise<boolean> {
    return this.requestService.DeleteRCA(RCAID);
  }
  UpdateRCA(RCAID: string, newRCA: RCAItem): Promise<boolean> {
    return this.requestService.UpdateRCA(RCAID, newRCA);
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

}
