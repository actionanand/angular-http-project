import { bootstrapApplication } from '@angular/platform-browser';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  /*
  const newReq = req.clone({
    headers: req.headers.set('new-Header', 'headerValue')
  });
  */

  console.log('Interceptor: ', req);
  return next(req);
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch(err => console.error(err));
