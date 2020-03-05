import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from "@app/services/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe( mergeMap((event: any) => {
            // 正常返回，处理具体返回参数
            if (event instanceof HttpResponse && event.status === 200) {
                return this.handleData(event);
            }// 具体处理请求返回数据
            return of(event);
        }),
        catchError((err: HttpErrorResponse) => this.handleData(err)))
      }

    private handleData(
      event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
      // 业务处理：一些通用操作
      switch (event.status) {
        case 200:
          if (event instanceof HttpResponse) {
              let body: any = event.body;
              if (body && body.status == false && body.code == 501) {
                  this.authenticationService.logoutFontend();
                  const eventnew = event.clone({body: ''});
                  return of(eventnew);
              }
            }
          break;
        case 401: // 未登录状态码
          if (event instanceof HttpResponse) {
            this.authenticationService.logoutFontend();
            const eventnew = event.clone({body: ''});
            return of(eventnew);
          }
          break;
        case 404:
          this.router.navigateByUrl('/notFound');
          break;
        // case 500:
        //  ……
        default:
        return of(event);
    }
      return of(event);
  }
}
