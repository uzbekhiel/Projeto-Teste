import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { environment } from "src/environments/environment";

export class UsersService {

    constructor(@Inject(HttpClient) private httpClient: HttpClient,) {

    }

    public getUsers(type = 0) {
        return this.httpClient.get(`${environment.api_url}Users`, { params: { "tipo": type.toString() } }).toPromise();
    }

    public saveUsers(model: any) {
        return this.httpClient.post(`${environment.api_url}Users`, model).toPromise();
    }
}