import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { retry, timer } from 'rxjs';
// import { mergeMap, retryWhen, of } from 'rxjs';

const maxRetries = 3;
const delayMs = 2000;

export const RetryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error: HttpErrorResponse, retryCount) => {
        if (error.status == 401) {
          console.log(req.url, ' : 401 retrying...', retryCount);
          return timer(delayMs);
        } else if (error.status >= 500) {
          console.log(req.url, ' : 500 retrying...', retryCount);
          return timer(delayMs);
        } else {
          console.log(`${req.url} : ${error.status} retrying... ${retryCount}`);
          return timer(delayMs);
        }
        throw error;
      },
    }),
  );
};

/*
// Simple retry
export const RetryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    retry(maxRetries)
  );
}
*/

/*
// using 'retryWhen' for status based retry
export const RetryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    retryWhen((error) => {
        return error.pipe(
          mergeMap((err, index) => {
            if (err.status == 401 && index < maxRetries) {
              return of(err).pipe(
                delay(delayMs)
              )
            }
            throw err;
          })
        )
      }
    )
  );
}
*/

/*
// using 'retryWhen' generally
export const RetryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    retryWhen((error) => {
        return error.pipe(
          scan((retryCount, error) => {
            if (retryCount >= maxRetries) {
              throw error
            }
            return retryCount + 1
          }, 0)
        )
      }
    )
  );
}
*/
