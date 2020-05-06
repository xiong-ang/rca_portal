import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { HotKeyword } from '@app/entities/hotKeyword';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
import { PreventionType, PreventionItem, MainTypeInfo, SubTypeInfo, PreventionStatus} from '@app/entities/prevention';

export interface IHttpRequester {
    GetProducts(): Promise<Array<ProductInfo>>;
	  GetProductVersions(productID: string): Promise<Array<VersionInfo>>;
    GetProductComponents(productID: string): Promise<Array<ComponentInfo>>;
    GetReadOutLevels(): Promise<ReadoutInfo[]>;

    UploadAttachment(rcaID: string, formData: any): Promise<boolean>;
    GetAttachment( path: string): Promise<any>;
    GetAttachments(rcaID: string): Promise<Attachment[]>;
    DeleteAttachment(rcaID: string, attachmentID: string): Promise<boolean>;

    CreateRCA(newRCA: RCAItem): Promise<string>;
    DeleteRCA(rcaID: string): Promise<boolean>;
    UpdateRCA(rcaID: string, updateRCA: any): Promise<boolean>;
    GetRCA(rcaID: string): Promise<RCAItem>;
    GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<Array<RCAItem>>; //To be designed by backend

    GetHotRCAs(start:number, count: number): Promise<Array<RCAItem>>; //To be designed by backend
    GetHotKeywords(start: number, count: number): Promise<Array<HotKeyword>>; //To be designed by backend

    GetPrevetionTypes(): Promise<PreventionType[]>;
    GetPreventionMainTypes(): Promise<MainTypeInfo[]>;
    GetPreventionSubTypes(): Promise<SubTypeInfo[]>;
    GetPreventionStatuses(): Promise<PreventionStatus[]>;
    GetPrevention(rcaID: string, typeID: string): Promise<PreventionItem[]>;
    AddPrevention(rcaID: string, preventionItem: PreventionItem, typeID: string): Promise<boolean>;
    DeletePrevention(rcaID: string, preventionID: string): Promise<boolean>;
    UpdatePrevention(rcaID: string, preventionID: string, updateBody: any): Promise<boolean>;

    PostRCAClickEvent(rcaID: string): Promise<boolean>; // For hot value
}
