import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { RCAItem } from '@app/entities/rcaItem';
import { FilterCondition } from '@app/entities/filterCondition';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {

  constructor(private mockDataService: MockDataService) { }

  // Create RCA
  async CreateRCA(newRCA: RCAItem) {
    alert('CreateRCA with data:\n' + JSON.stringify(newRCA));
  }

  // Update RCA
  async UpdateRCA(RCAID: string, newRCA: RCAItem) {
    alert('CreateRCA with ID:\n' + RCAID + '\n Date:\n' + JSON.stringify(newRCA));
  }

  // Query RCA
  async GetRCAs(filterCondition: FilterCondition) {
    return new Promise((reslove, reject)=>{
      reslove(this.mockDataService.GetFilteredRCAs(filterCondition));
    });
  }

  // Delete RCA
  async DeleteRCA(RCAID: string) {
    alert('DeleteRCA with ID:\n' + RCAID);
  }

  // Get Hot RCA
  async GetHotRCAs(count) {
    return new Promise((reslove, reject)=>{
      reslove(this.mockDataService.HotRCAs.slice(0, count));
    });
  }

  // Get Hot Keywords
  async GetHotKeywords(start, count) {
    return new Promise((reslove, reject)=>{
      reslove(this.mockDataService.HotKeywords.slice(start, start + count));
    });
  }

  // Get All Impacted Product Names, Fix Versions, Components
  async GetProducts() {
    return new Promise((reslove, reject)=>{
      reslove(this.mockDataService.Products);
    });
  }

  // Post RCA Click Event
  async PostRCAClickEvent() {
    alert('PostRCAClickEvent');
  }
}
