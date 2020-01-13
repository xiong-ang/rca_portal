import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { RCAItem, Attachment } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';
import { IHttpRequester } from '@app/interfaces/IHttpRequester';
import { HotKeyword } from '@app/entities/hotKeyword';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterMockService implements IHttpRequester {
  constructor(private mockDataService: MockDataService) { }

  GetProducts(): Promise<string[]> {
    return new Promise((reslove, reject) => {
      let products = [];
      this.mockDataService.Products.forEach(productInfo => {
        products.push(productInfo.name);
      });

      setTimeout(() => {
        reslove(products || []);
      }, 1000);
    });
  }

  GetProductVersions(productName: string): Promise<string[]> {
    return new Promise((reslove, reject) => {
      let currentProduct = this.mockDataService.Products.find(productInfo => {
        return productInfo.name == productName;
      })

      setTimeout(() => {
        reslove(currentProduct ? currentProduct.versions : []);
      }, 1000);
    });
  }
  GetProductComponents(productName: string): Promise<string[]> {
    return new Promise((reslove, reject) => {
      let currentProduct = this.mockDataService.Products.find(productInfo => {
        return productInfo.name == productName;
      })

      setTimeout(() => {
        reslove(currentProduct ? currentProduct.components : []);
      }, 1000);
    });
  }
  GetReadOutLevels(): Promise<Array<string>> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.mockDataService.ReadOutLevels || []);
      }, 1000);
    });
  }

  UploadAttachment(rawData: any): Promise<Attachment> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('UploadAttachment');
        reslove(null);
      }, 1000);
    });

  }
  GetAttachment(attachmentID: string): Promise<any> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('GetAttachment');
        reslove(null);
      }, 1000);
    });
  }

  CreateRCA(newRCA: RCAItem): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('CreateRCA with data:\n' + JSON.stringify(newRCA));
        reslove(true);
      }, 1000);
    });
  }
  DeleteRCA(RCAID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('DeleteRCA with ID:\n' + RCAID);
        reslove(true);
      }, 1000);
    });
  }
  UpdateRCA(RCAID: string, newRCA: RCAItem): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('UpdateRCA with ID:\n' + RCAID + '\n Date:\n' + JSON.stringify(newRCA));
        reslove(true);
      }, 1000);

    });
  }
  GetRCAs(filterCondition: FilterCondition, start: number, count: number): Promise<RCAItem[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.mockDataService.GetFilteredRCAs(filterCondition).slice(start, start + count));
      }, 1000);
    });
  }

  GetHotRCAs(start: number, count: number): Promise<RCAItem[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.mockDataService.HotRCAs.slice(0, count));
      }, 1000);
    });
  }
  GetHotKeywords(start: number, count: number): Promise<HotKeyword[]> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(this.mockDataService.HotKeywords.slice(start, start + count));
      }, 1000);
    });
  }

  PostRCAClickEvent(RCAID: string): Promise<boolean> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        alert('PostRCAClickEvent');
        reslove(true);
      }, 1000);
    });
  }
}
