import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { IHttpRequester } from '@app/interfaces/IHttpRequester';
import { HotKeyword } from '@app/entities/hotKeyword';
import { ResPackage } from '@app/entities/ResPackage';
import { HttpClient } from '@angular/common/http';
import { ProductInfo } from '@app/entities/productInfo';
import { VersionInfo } from '@app/entities/versionInfo';
import { ComponentInfo } from '@app/entities/componentInfo';
import { ReadoutInfo } from '@app/entities/readoutInfo';
import { PreventionType, PreventionItem, MainTypeInfo, SubTypeInfo, PreventionStatus} from '@app/entities/prevention';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterMockService implements IHttpRequester {
  constructor(private mockDataService: MockDataService, private http: HttpClient) { }
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  GetProducts(): Promise<ProductInfo[]> {
    return new Promise((reslove, reject) => {
      let products = [
        { "ID": "20A2CDDB-0DB8-404E-A4D7-26FB98742004", "ProductName": "FTViewME" },
        { "ID": "237D13B0-C71E-4F9E-9CE5-764B58098634", "ProductName": "FTViewSE" },
        { "ID": "BFCC11AA-556D-41B6-85CB-E42AFFBA7C73", "ProductName": "CCW" }];

      setTimeout(() => {
        reslove(products || []);
      }, 1000);
    });
  }

  GetProductVersions(productID: string): Promise<VersionInfo[]> {
    return new Promise((reslove, reject) => {

      let versions = [
        { "ID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Version": "10.0", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "343B5693-5C9B-4B5A-A53A-329AF49EAD33", "Version": "8.0", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "1E108654-ED54-410C-8A35-83520B195ABF", "Version": "9.0", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "E94262C9-32EF-4FFE-86D1-A0A0CA1851BF", "Version": "12.0", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "80477880-2352-45E1-92D1-A9E7C8456A1F", "Version": "11.0", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "1ED6B6CB-B571-4B18-A645-FB54D4F92B35", "Version": "8.10", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" }];


      setTimeout(() => {
        reslove(versions);
      }, 1000);
    });
  }
  GetProductComponents(productID: string): Promise<ComponentInfo[]> {
    return new Promise((reslove, reject) => {

      let components = [
        { "ID": "80A1C11A-EA9C-4FE5-9DEC-016A5BCBD03D", "ComponentName": "DataGrid", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "348D3642-AA3C-4340-ABA0-2C590A665AFE", "ComponentName": "Parameter", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "5DD6EA5F-D870-4034-B800-9824CFF25760", "ComponentName": "Datalog", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "7ED19795-0EC9-44EB-8C59-9FC427CF425D", "ComponentName": "Serversidescript", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "EC1ABEE7-02FB-4C4A-96DE-E1E3062CAF86", "ComponentName": "Backup&restore", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" },
        { "ID": "9291CFA8-CDC8-499A-AE75-E95EE68F1D39", "ComponentName": "Command", "ProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634" }
      ];
      setTimeout(() => {
        reslove(components);
      }, 1000);
    });
  }
  GetReadOutLevels(): Promise<ReadoutInfo[]> {
    return new Promise((reslove, reject) => {
      const ReadoutArray = [
        { "ID": "20A2CDDB-0DB8-404E-A4D7-26FB98742004", "ReadoutLevel": "Sprint Review" },
        { "ID": "237D13B0-C71E-4F9E-9CE5-764B58098634", "ReadoutLevel": "PI Planning" },
        { "ID": "BFCC11AA-556D-41B6-85CB-E42AFFBA7C73", "ReadoutLevel": "Other" }];
      setTimeout(() => {
        reslove(ReadoutArray);
      }, 1000);
    });
  }

  UploadAttachment(rcaID: string, formData: any): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('UploadAttachment');
        reslove(null);
      }, 1000);
    });

  }
  DeleteAttachment(rcaID: string, attachmentID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('DeleteAttachment');
        reslove(null);
      }, 1000);
    });
  }
  GetAttachment( path: string): Promise<any> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetAttachment');
        reslove(null);
      }, 1000);
    });
  }
  GetAttachments(rcaID: string): Promise<Attachment[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetAttachments');
        reslove(null);
      }, 1000);
    });
  }

  GetPrevetionTypes(): Promise<PreventionType[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetPrevetionTypes');
        reslove(null);
      }, 1000);
    });
  }

  GetPreventionMainTypes(): Promise<MainTypeInfo[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetPreventionMainTypes');
        reslove(null);
      }, 1000);
    });
  }

  GetPreventionSubTypes(): Promise<SubTypeInfo[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetPreventionSubTypes');
        reslove(null);
      }, 1000);
    });
  }

  GetPreventionStatuses(): Promise<PreventionStatus[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetPreventionStatuses');
        reslove(null);
      }, 1000);
    });
  }

  GetPrevention(rcaID: string, typeID: string): Promise<PreventionItem[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetPrevention');
        reslove(null);
      }, 1000);
    });
  }

  AddPrevention(rcaID: string, preventionItem: PreventionItem, typeID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('AddPrevention');
        reslove(null);
      }, 1000);
    });
  }

  DeletePrevention(rcaID: string, preventionID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('DeletePrevention');
        reslove(null);
      }, 1000);
    });
  }

  UpdatePrevention(rcaID: string, preventionID: string, updateBody: any): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('UpdatePrevention');
        reslove(null);
      }, 1000);
    });
  }

  CreateRCA(newRCA: RCAItem): Promise<string> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('CreateRCA with data:\n' + JSON.stringify(newRCA));
        reslove('');
      }, 1000);
    });
  }
  DeleteRCA(rcaID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('DeleteRCA with ID:\n' + rcaID);
        reslove(true);
      }, 1000);
    });
  }
  UpdateRCA(rcaID: string, updateRCA: any): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('UpdateRCA with ID:\n' + rcaID + '\n Date:\n' + JSON.stringify(updateRCA));
        reslove(true);
      }, 1000);

    });
  }
  GetRCA(rcaID: string): Promise<RCAItem> {
    return new Promise((reslove, reject) => {
      let res = {
        "status": true, "message": "OK", "data": [{
          "ID": "D68F1347-1FB3-49EF-A762-64AE17E4717D",
          "Header": "Dennis change this headerby postman", "RCAID": "FTVIEWSE-1100", "FixVersion": "12.0", "FixVersionID": "E94262C9-32EF-4FFE-86D1-A0A0CA1851BF",
          "Submitter": "Dennis Liansheng Lv", "Fixer": "Dennis LianshengLv", "Component": "Data Grid", "ComponentID": "80A1C11A-EA9C-4FE5-9DEC-016A5BCBD03D",
          "ImpactedProduct": "FTView SE", "ImpactedProductID": "237D13B0-C71E-4F9E-9CE5-764B58098634", "Keywords": "Crash", "ReadoutLevel": "Sprint Review", "ReadoutLevelID": "20A2CDDB-0DB8-404E-A4D7-26FB98742004",
          "RootCauseAnalyze": "how towrite a testanalysis", "RootCauseCR": "23456", "Requirement_RootCause": "",
          "Requirement_Correction": "", "Requirement_Prevention": "", "Dev_RootCause": "qwerfghj sedefdrrgrgd",
          "Dev_Correction": "eeeeeeeeeeeeeeeeeeeeeee", "Dev_Prevention": "asvbffgggggggg", "Test_RootCause": "",
          "Test_Correction": "", "Test_Prevention": "", "CreatedTime": "2020-02-02T20:20:20.000Z"
        }], "timeSpan": 4002
      }

      const RCA = new RCAItem();
      if (res.status) {
        RCA.ID = rcaID;
        RCA.Header = res.data[0].Header;
        RCA.RCAID = res.data[0].RCAID;
        RCA.Submitter = res.data[0].Submitter;
        RCA.ImpactedProduct = res.data[0].ImpactedProduct;
        RCA.ImpactedProductID = res.data[0].ImpactedProductID;
        RCA.FixVersion = res.data[0].FixVersion;
        RCA.FixVersionID = res.data[0].FixVersionID;
        RCA.Component = res.data[0].Component;
        RCA.ComponentID = res.data[0].ComponentID;
        RCA.KeyWords = res.data[0].Keywords.split(',');
        RCA.ReadoutLevel = res.data[0].ReadoutLevel;
        RCA.ReadoutLevelID = res.data[0].ReadoutLevelID;
        RCA.RootCauseCR = res.data[0].RootCauseCR;
        RCA.RootCauseAnalyze = res.data[0].RootCauseAnalyze;
        RCA.RequirementCorrectAndPrevention.RootCause = res.data[0].Requirement_RootCause;
        RCA.RequirementCorrectAndPrevention.Correction = res.data[0].Requirement_Correction;
        RCA.RequirementCorrectAndPrevention.Prevention = res.data[0].Requirement_Prevention;
        RCA.DevCorrectAndPrevention.RootCause = res.data[0].Dev_RootCause;
        RCA.DevCorrectAndPrevention.Correction = res.data[0].Dev_Correction;
        RCA.DevCorrectAndPrevention.Prevention = res.data[0].Dev_Prevention;
        RCA.TestCorrectAndPrevention.RootCause = res.data[0].Test_RootCause;
        RCA.TestCorrectAndPrevention.Correction = res.data[0].Test_Correction;
        RCA.TestCorrectAndPrevention.Prevention = res.data[0].Test_Prevention;
        RCA.IsManagable = true;
      } else {
        throw new Error(res.message);
      }
      setTimeout(() => {
        reslove(RCA);
      }, 1000);
    });
  }
  GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<RCAItem[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        const res = {
          "status": true, "message": "OK", "data": [{
            "RowNum": "1", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "2", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "3", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "4", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "5", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "6", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "7", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "8", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "9", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "10", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "11", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "12", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "13", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "14", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          },
          {
            "RowNum": "15", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
            "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
            "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
            "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
            "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
            "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
            "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
            "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
            "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
          }], "timeSpan": 237, "total": 123, "startIndex": 1, "pageSize": 50
        };
        const RCArray: RCAItem[] = [];
        if (res.status) {

          res.data.forEach(rcaobj => {
            const RCA = new RCAItem();
            RCA.ID = rcaobj.ID;
            RCA.Header = rcaobj.Header;
            RCA.RCAID = rcaobj.RCAID;
            RCA.Submitter = rcaobj.Submitter;
            RCA.ImpactedProduct = rcaobj.ImpactedProduct;
            RCA.ImpactedProductID = rcaobj.ImpactedProductID;
            RCA.FixVersion = rcaobj.FixVersion;
            RCA.FixVersionID = rcaobj.FixVersionID;
            RCA.Component = rcaobj.Component;
            RCA.ComponentID = rcaobj.ComponentID;
            RCA.KeyWords = rcaobj.Keywords.split(',');
            RCA.ReadoutLevel = rcaobj.ReadoutLevel;
            RCA.ReadoutLevelID = rcaobj.ReadoutLevelID;
            RCA.RootCauseCR = rcaobj.RootCauseCR;
            RCA.RootCauseAnalyze = rcaobj.RootCauseAnalyze;
            RCA.RequirementCorrectAndPrevention.RootCause = rcaobj.RequirementRootCause;
            RCA.RequirementCorrectAndPrevention.Correction = rcaobj.RequirementCorrection;
            RCA.RequirementCorrectAndPrevention.Prevention = rcaobj.RequirementPrevention;
            RCA.DevCorrectAndPrevention.RootCause = rcaobj.DevRootCause;
            RCA.DevCorrectAndPrevention.Correction = rcaobj.DevCorrection;
            RCA.DevCorrectAndPrevention.Prevention = rcaobj.DevPrevention;
            RCA.TestCorrectAndPrevention.RootCause = rcaobj.TestRootCause;
            RCA.TestCorrectAndPrevention.Correction = rcaobj.TestCorrection;
            RCA.TestCorrectAndPrevention.Prevention = rcaobj.TestPrevention;
            RCA.IsManagable = true;
            RCArray.push(RCA);
          });
        }
        reslove(RCArray);
      }, 1000);
    });

  }

  GetHotRCAs(start: number, count: number): Promise<RCAItem[]> {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          const res = {
            "status": true, "message": "OK", "data": [{
              "RowNum": "1", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "2", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "3", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "4", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "5", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "6", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "7", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "8", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "9", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "10", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "11", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "12", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "13", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "14", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            },
            {
              "RowNum": "15", "ID": "88FFCF7A-3AD4-45AF-9744-11480A7F2DE0",
              "Header": "Simulator is not switch to program mode after 10 minutes if simulator is in remote runmode",
              "RCAID": "APBCCCWART-2676", "FixVersion": "CCW R12", "FixVersionID": "32A8B371-D764-47A4-B26B-1E8D3C00785F", "Submitter": "Emma Xiaobin Ma", "Fixer": "Emma XiaobinMa",
              "Component": "R12_Micro800_Simulator_StandAlone", "ComponentID": "974E9DA7-0EBC-4A8A-B890-2F17E70F0586",
              "ImpactedProduct": "CCW", "ImpactedProductID": "B7F59EFE-5579-4281-B05C-388D24EA4BBB",
              "Keywords": "Simulator,change mode", "ReadoutLevel": "Internal Share", "ReadoutLevelID": "3A0258ED-A92C-4D89-B916-44D46B421969",
              "RootCauseAnalyze": "\"Requirement change\nSimulator is not switch to program mode after 10 minutes if simulator is in remote runmode\"",
              "RootCauseCR": "", "RequirementRootCause": "", "RequirementCorrection": "", "RequirementPrevention": "", "DevRootCause": "", "DevCorrection": "",
              "ReviewedTimes": 0, "DevPrevention": "", "TestRootCause": "", "TestCorrection": "", "TestPrevention": "", "CreatedTime": "2020-02-24T17:08:44.327Z"
            }], "timeSpan": 237, "total": 123, "startIndex": 1, "pageSize": 50
          };
          const RCArray: RCAItem[] = [];
          if (res.status) {

            res.data.forEach(rcaobj => {
              const RCA = new RCAItem();
              RCA.ID = rcaobj.ID;
              RCA.Header = rcaobj.Header;
              RCA.RCAID = rcaobj.RCAID;
              RCA.Submitter = rcaobj.Submitter;
              RCA.ImpactedProduct = rcaobj.ImpactedProduct;
              RCA.ImpactedProductID = rcaobj.ImpactedProductID;
              RCA.FixVersion = rcaobj.FixVersion;
              RCA.FixVersionID = rcaobj.FixVersionID;
              RCA.Component = rcaobj.Component;
              RCA.ComponentID = rcaobj.ComponentID;
              RCA.KeyWords = rcaobj.Keywords.split(',');
              RCA.ReadoutLevel = rcaobj.ReadoutLevel;
              RCA.ReadoutLevelID = rcaobj.ReadoutLevelID;
              RCA.RootCauseCR = rcaobj.RootCauseCR;
              RCA.RootCauseAnalyze = rcaobj.RootCauseAnalyze;
              RCA.RequirementCorrectAndPrevention.RootCause = rcaobj.RequirementRootCause;
              RCA.RequirementCorrectAndPrevention.Correction = rcaobj.RequirementCorrection;
              RCA.RequirementCorrectAndPrevention.Prevention = rcaobj.RequirementPrevention;
              RCA.DevCorrectAndPrevention.RootCause = rcaobj.DevRootCause;
              RCA.DevCorrectAndPrevention.Correction = rcaobj.DevCorrection;
              RCA.DevCorrectAndPrevention.Prevention = rcaobj.DevPrevention;
              RCA.TestCorrectAndPrevention.RootCause = rcaobj.TestRootCause;
              RCA.TestCorrectAndPrevention.Correction = rcaobj.TestCorrection;
              RCA.TestCorrectAndPrevention.Prevention = rcaobj.TestPrevention;
              RCA.IsManagable = true;
              RCArray.push(RCA);
            });
          }
          reslove(RCArray);
        }, 1000);
      });

    }
    GetHotKeywords(start: number, count: number): Promise < HotKeyword[] > {

      return new Promise((reslove, reject) => {
        setTimeout(() => {
          const res = {
            "status": true, "message": "OK",
            "data": [
              { "RowNum": "1", "ID": "AE25E20D-6222-49D0-B2A4-6F81BF4DC607", "Keyword": "Crash", "ReferenceTimes": 1, "QueriedTimes": 1000 },
              { "RowNum": "2", "ID": "73439B26-00EE-4A5E-A3DA-2032C33885D0", "Keyword": "Hang", "ReferenceTimes": 0, "QueriedTimes": 800 },
              { "RowNum": "3", "ID": "EFEC6943-CC6B-433F-950E-3217C667DB22", "Keyword": ".Netissue", "ReferenceTimes": 0, "QueriedTimes": 700 },
              { "RowNum": "4", "ID": "BFC2127B-E769-4D55-B09D-37A57F4FD1ED", "Keyword": "Handleleak", "ReferenceTimes": 0, "QueriedTimes": 23 },
              { "RowNum": "5", "ID": "854EA500-EA3D-4748-B446-43868D0A9AC0", "Keyword": "Memoryleak", "ReferenceTimes": 3, "QueriedTimes": 10 },
              { "RowNum": "6", "ID": "7F224586-868D-4ACD-8D70-528D552E8D02", "Keyword": "Unicode", "ReferenceTimes": 3, "QueriedTimes": 0 }],
            "timeSpan": 16089, "total": 6, "startIndex": 1, "pageSize": 6
          }
          const HotKeywords: HotKeyword[] = [];
          if (res.status) {
            const MaxQueriedTimes = res.data[0].QueriedTimes;
            res.data.forEach(KeywordItem => {
              let hotkeyword = new HotKeyword();
              hotkeyword.HotProp = (KeywordItem.QueriedTimes / MaxQueriedTimes) * 100;
              hotkeyword.ID = KeywordItem.ID;
              hotkeyword.KeywordValue = KeywordItem.Keyword;
              hotkeyword.HotValue = KeywordItem.QueriedTimes;
              hotkeyword.RCACount = KeywordItem.ReferenceTimes;
              HotKeywords.push(hotkeyword);
            });
          }
          reslove(HotKeywords);
        }, 1000);
      });

    }

    PostRCAClickEvent(RCAID: string): Promise < boolean > {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          alert('PostRCAClickEvent');
          reslove(true);
        }, 1000);
      });
    }
  }
