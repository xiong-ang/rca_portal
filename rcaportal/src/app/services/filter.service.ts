import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private router: Router) { }

  openFilterResultPage() {
    this.router.navigateByUrl('/filter');
  }
}
