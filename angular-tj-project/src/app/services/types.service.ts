import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { environment } from "src/environments/environment";

export class TypesService {

    constructor(@Inject(HttpClient) private httpClient: HttpClient,) {

    }

    public getTypes() {
        return this.httpClient.get(`${environment.api_url}UserTypes`)
            .toPromise();
    }
}