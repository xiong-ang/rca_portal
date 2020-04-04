import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/entities/user';
import { ResPackage } from '@app/entities/ResPackage';
import { CookieService } from 'ngx-cookie-service';
import { RcaDialogService } from "@app/services/rca-dialog.service";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private userName: string;
  private userID: string;
  private userRole: string;
  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private dialog: MatDialog,
              ) {
                this.userName = this.cookieService.get('userName');
                this.userID = this.cookieService.get('userID');
                this.userRole = this.cookieService.get('userRole');
              }

  public get currentUserName(): string {
    return this.userName;
  }
  public get currentUserID(): string {
    return this.userID;
  }
  public get currentUserRole(): string {
    return this.userRole;
  }

  login(username: string, password: string, isremeber: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<ResPackage>('/api/v1/user/login', { UserName: username, Password: password })
      .toPromise()
      .then(res => {
        if (res && res.status) {
          this.userName = this.cookieService.get('userName');
          this.userID = this.cookieService.get('userID');
          this.userRole = this.cookieService.get('userRole');
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
          this.userName = null;
          this.router.navigate(['/login']);
          resolve(true);
        } else {
          reject(res && res.message);
        }
      })
      .catch(this.handleError);
    });
  }

  logoutFontend() {
    this.cookieService.delete('userName');
    this.cookieService.delete('userID');
    this.cookieService.delete('userRole');
    this.userName = null;
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }

  isHasAccessRight(submitterID: string): boolean {
    if(this.userRole == "SuperAdmin") {
      return true;
    }
    if((submitterID ||'').toLowerCase() == (this.userID || '').toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }
}

