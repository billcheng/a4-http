# a4-http
Angular 4 Enhanced Http Service

# How-To
## Install
```
npm install a4-http
```

## app.module.ts
1. Add ```HttpModule``` to imports of the ```app.module.ts```.

```typescript

...
import { HttpModule } from 'a4-http';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...,
    HttpModule,
    ...
  ],
  ...
})
```

## Inject the service
```typescript
constructor(private http: HttpService) { }
```

## Show/Hide the Spinner
```typescript
this.http.setSpinner(
    () => {
        ... // show spinner code
    }, () => {
        ... // hide spinner code
    }
);
```

## get, post, put, patch & delete
```typescript
public get(url: string, showSpinner?: boolean): Observable<Response>;
public get(url: string, options?: any, showSpinner?: boolean): Observable<Response>;

public post(url: string, body: any, showSpinner?: boolean): Observable<Response>;
public post(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;

public put(url: string, body: any, showSpinner?: boolean): Observable<Response>;
public put(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;

public patch(url: string, body: any, showSpinner?: boolean): Observable<Response>;
public patch(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;

public delete(url: string, showSpinner?: boolean): Observable<Response>;
public delete(url: string, options?: any, showSpinner?: boolean): Observable<Response>;
```

## redirect when error
```typescript
this.http.setRedirect({
      '-1': '/error',
      0: '/signin',
      401: '/signin',
      403: '/signin'
    });
```
1. Redirect to ```/signin``` if http status is 0, 401 or 403.
1. '-1' is the default route if there is an error... '-1' is optional.