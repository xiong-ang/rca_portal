import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/entities/user';
import { ResPackage } from '@app/entities/ResPackage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string>(cookieService.get('userName'));
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, isremeber: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<ResPackage>('/api/v1/user/login', { UserName: username, Password: password })
      .toPromise()
      .then(res => {
        if (res && res.status) {
          this.currentUserSubject.next(this.cookieService.get('userName'));
          if (!isremeber) {
            this.cookieService.set('userName', this.cookieService.get('userName'), 0);
          }
          resolve(true);
        } else {
          reject(res && res.message);
        }
      })
      .catch(this.handleError);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.get<ResPackage>('/api/v1/user/logout')
      .toPromise()
      .then(res => {
        if (res && res.status) {
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
          resolve(true);
        } else {
          reject(res && res.message);
        }
      })
      .catch(this.handleError);
    });
  }

  logoutFontend () {
    this.cookieService.delete('userName');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
