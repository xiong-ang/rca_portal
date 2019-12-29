import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RcaDetailService {

  constructor(private router: Router) { }
  
  openRCADetail() {
    this.router.navigateByUrl('/rca');
  }
}
