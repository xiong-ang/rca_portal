import { Injectable } from '@angular/core';
import { RCAItem } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { IHttpRequester } from '@app/interfaces/IHttpRequester';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService implements IHttpRequester {
  GetProducts(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  GetProductVersions(productName: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  GetProductComponents(productName: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  UploadAttachment(rawData: any): Promise<import("../../entities/rcaItem").Attachment> {
    throw new Error("Method not implemented.");
  }
  GetAttachment(attachmentID: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  CreateRCA(newRCA: RCAItem): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  DeleteRCA(RCAID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  UpdateRCA(RCAID: string, newRCA: RCAItem): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<RCAItem[]> {
    throw new Error("Method not implemented.");
  }
  GetHotRCAs(start: number, count: number): Promise<RCAItem[]> {
    throw new Error("Method not implemented.");
  }
  GetHotKeywords(start: number, count: number): Promise<import("../../entities/hotKeyword").HotKeyword[]> {
    throw new Error("Method not implemented.");
  }
  PostRCAClickEvent(RCAID: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
