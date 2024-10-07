import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

/*
// DI based / class based interceptors
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interceptor: ', req);
    return next.handle(req);
  }
}

// use the below code in 'AppModule'
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class AppModule {}
/*


/*
export function LoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('Interceptor: ', req);
  return next(req);
}
*/

export const LoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const newReq = req.clone({
    headers: req.headers.set('new-Header', 'headerValue'),
  });

  // const newReq = req.clone({
  //   setHeaders: {
  //     'new-Header': 'headerValue'
  //   }
  // });

  console.log('Interceptor: ', newReq);
  return next(newReq);
};
