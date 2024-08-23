import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class httpClientInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem(environment.tokenKey);
        if (token != null && token != undefined)
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${token}`,
                }
            });

        return next.handle(request);
    }
}