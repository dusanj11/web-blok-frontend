import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IdentityUser } from '../model/identity-user';

// injectable omogucava da unutar konsturktora (naseg servisa) stavimo neki dependency
@Injectable()
export class HttpService{

    data: any; //covek ovo ti ne treba

    constructor (private http: Http){

    }

    // getProducts(): Observable<any> {
    //
    //     return this.http.get("http://localhost:54042/api/country/countries").map(this.extractData);
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    registerUser(user: IdentityUser ): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        'http://localhost:54042/api/Account/Register',
        JSON.stringify({
            Email: user.Email,
            Password: user.Password,
            ConfirmPassword: user.ConfirmPassword
        }), opts);
    }

    signInUser(user: any): Observable<any>{
        const headers: Headers = new Headers();
        //headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/x-www-form-urlencoded');



        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        let bodyURL = new URLSearchParams();
        bodyURL.set('username', user.username);
        bodyURL.set('password', user.password);
        bodyURL.set('grant_type', "password");

        let body = bodyURL.toString();

        return this.http.post(
          'http://localhost:54042/oauth/token',
          body,opts);
    }

    getAccommodation(): Observable<any>{
        return this.http.get("http://localhost:54042/api/accommodation/accommodations").map(this.extractData);
    }


}
