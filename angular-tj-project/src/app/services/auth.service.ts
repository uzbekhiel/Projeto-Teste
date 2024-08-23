import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { environment } from "src/environments/environment";

export class AuthService {

    constructor(@Inject(HttpClient) private httpClient: HttpClient,) {

    }

    public login(model: any) {
        return this.httpClient.post(`${environment.api_url}Auth`, model).toPromise();
    }
}