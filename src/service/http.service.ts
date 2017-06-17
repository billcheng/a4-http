import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

export type Redirect = { [index: number]: string };
export type SpinnerFunction = { (): void };

@Injectable()
export class HttpService {

    private tokenType: string;
    private token: string;
    private cookieName: string;
    private redirect: Redirect;
    private spinnerOn: SpinnerFunction;
    private spinnerOff: SpinnerFunction;

    constructor(private http: Http, private router: Router) { }

    private options(options: any): RequestOptionsArgs {
        let token: string;

        if (!!this.token) {
            token = this.token;
        }

        if (!token && !!this.cookieName) {
            const escape = (s: string): string => s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1');
            const match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(this.cookieName) + '=([^;]*)'));
            token = match ? match[1] : null;
        }

        const headers = options.headers || {};
        const result = !!token ? { ...headers, Authorization: `${this.tokenType || 'Bearer'} ${token}` } : headers;

        return Object.keys(result).length > 0 ? new RequestOptions({ ...options, headers: result }) : new RequestOptions(options);
    }

    public get(url: string, showSpinner?: boolean): Observable<Response>;
    public get(url: string, options?: any, showSpinner?: boolean): Observable<Response>;
    public get(url: string, arg1: any, arg2 = true): Observable<Response> {
        const showSpinner = typeof (arg1) === 'boolean' ? arg1 : arg2;
        const options = typeof (arg1) === 'object' ? arg1 : {};

        this.doShowSpinner(showSpinner);
        return this.http.get(url, this.options(options))
            .finally(() => this.doHideSpinner(showSpinner))
            .catch(err => this.processException(err));
    }

    public post(url: string, body: any, showSpinner?: boolean): Observable<Response>;
    public post(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;
    public post(url: string, body: any, arg1: any, arg2 = true): Observable<Response> {
        const showSpinner = typeof (arg1) === 'boolean' ? arg1 : arg2;
        const options = typeof (arg1) === 'object' ? arg1 : {};

        this.doShowSpinner(showSpinner);
        return this.http.post(url, body, this.options(options))
            .finally(() => this.doHideSpinner(showSpinner))
            .catch(err => this.processException(err));
    }

    public put(url: string, body: any, showSpinner?: boolean): Observable<Response>;
    public put(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;
    public put(url: string, body: any, arg1: any, arg2 = true): Observable<Response> {
        const showSpinner = typeof (arg1) === 'boolean' ? arg1 : arg2;
        const options = typeof (arg1) === 'object' ? arg1 : {};

        this.doShowSpinner(showSpinner);
        return this.http.put(url, body, this.options(options))
            .finally(() => this.doHideSpinner(showSpinner))
            .catch(err => this.processException(err));
    }


    public patch(url: string, body: any, showSpinner?: boolean): Observable<Response>;
    public patch(url: string, body: any, options?: any, showSpinner?: boolean): Observable<Response>;
    public patch(url: string, body: any, arg1: any, arg2 = true): Observable<Response> {
        const showSpinner = typeof (arg1) === 'boolean' ? arg1 : arg2;
        const options = typeof (arg1) === 'object' ? arg1 : {};

        this.doShowSpinner(showSpinner);
        return this.http.patch(url, body, this.options(options))
            .finally(() => this.doHideSpinner(showSpinner))
            .catch(err => this.processException(err));
    }

    public delete(url: string, showSpinner?: boolean): Observable<Response>;
    public delete(url: string, options?: any, showSpinner?: boolean): Observable<Response>;
    public delete(url: string, arg1: any, arg2 = true): Observable<Response> {
        const showSpinner = typeof (arg1) === 'boolean' ? arg1 : arg2;
        const options = typeof (arg1) === 'object' ? arg1 : {};

        this.doShowSpinner(showSpinner);
        return this.http.delete(url, this.options(options))
            .finally(() => this.doHideSpinner(showSpinner))
            .catch(err => this.processException(err));
    }

    private doShowSpinner(showSpinner: boolean) {
        if (showSpinner && !!this.spinnerOn) {
            this.spinnerOn();
        }
    }

    private doHideSpinner(showSpinner: boolean) {
        if (showSpinner && !!this.spinnerOff) {
            this.spinnerOff();
        }
    }

    private doRedirect(link: string) {
        if (link.startsWith('http')) {
            window.location.href = link;
        } else {
            this.router.navigateByUrl(link);
        }
    }

    private processException(err: any) {

        if (!!this.redirect) {
            const link = this.redirect[err.status];
            if (!!link) {
                this.doRedirect(link);
                return Observable.empty();
            } else {
                const defaultLink = this.redirect[-1];
                if (!!defaultLink) {
                    this.doRedirect(defaultLink);
                    return Observable.empty();
                }
            }
        }
        return Observable.throw(err);

    }

    public setAuthorizationToken(tokenType: string, token: string) {
        this.tokenType = tokenType;
        this.token = token;
    }

    public setCookieName(name: string) {
        this.cookieName = name;
    }

    public setRedirect(redirect: Redirect) {
        this.redirect = redirect;
    }

    public setSpinner(spinnerOn: SpinnerFunction, spinnerOff: SpinnerFunction) {
        this.spinnerOn = spinnerOn;
        this.spinnerOff = spinnerOff;
    }

}