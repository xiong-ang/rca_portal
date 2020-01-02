import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FilterCondition } from '@app/entities/filterCondition';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public currentFilterCondition: FilterCondition;

  constructor(private router: Router) { }

  getProducts(){

  }

  getFixVersions(productNmae){

  }

  getComponents(productName){

  }

  openFilterResultPage() {
    this.router.navigateByUrl('/filter');
  }
}
