import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { HotKeyword } from '@app/entities/hotKeyword';

export interface IHttpRequester {
    GetProducts(): Promise<Array<string>>;
	GetProductVersions(productName: string): Promise<Array<string>>;
    GetProductComponents(productName: string): Promise<Array<string>>;
    GetReadOutLevels(): Promise<Array<string>>;

    UploadAttachment(rawData: any): Promise<Attachment>;
    GetAttachment(attachmentID: string): Promise<any>;

    CreateRCA(newRCA: RCAItem): Promise<boolean>;
    DeleteRCA(RCAID: string): Promise<boolean>;
    UpdateRCA(RCAID: string, newRCA: RCAItem): Promise<boolean>;
    GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<Array<RCAItem>>; //To be designed by backend

    GetHotRCAs(start:number, count: number): Promise<Array<RCAItem>>; //To be designed by backend
    GetHotKeywords(start: number, count: number): Promise<Array<HotKeyword>>; //To be designed by backend

    PostRCAClickEvent(RCAID: string): Promise<boolean>; // For hot value
}
