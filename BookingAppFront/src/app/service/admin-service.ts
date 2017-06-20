import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Country } from "app/country/country";
import { Region } from "app/country/region/region";
import { Place } from "app/place/place";


@Injectable()
export class AdminService {

    constructor(private http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getCountries(): Observable<Country> {
        return this.http.get("http://localhost:54042/api/country/countries").map(this.extractData);
    }

    getRegions(): Observable<Region> {
        return this.http.get("http://localhost:54042/api/region/regions").map(this.extractData);
    }

    getPlaces(): Observable<Place> {
        return this.http.get("http://localhost:54042/api/place/places").map(this.extractData);
    }

    postCountry(country: Country, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            "http://localhost:54042/api/country/countries",
            JSON.stringify({
                Name: country.Name,
                Code: country.Code
            }), opts);
    }


    postRegion(region: Region, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            "http://localhost:54042/api/region/regions",
            JSON.stringify({
                Name: region.Name,
                CountryId: region.CountryId
            }), opts);

    }

    postPlace(place: Place, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            "http://localhost:54042/api/place/places",
            JSON.stringify({
                Name: place.Name,
                RegionId: place.RegionId
            }), opts);
    }

    putCountry(country: Country, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(
            `http://localhost:54042/api/country/countries/${country.Id}`,
            JSON.stringify({
                Name: country.Name,
                Code: country.Code,
                Id: country.Id
            }), opts);
    }

    putRegion(region: Region, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(
            `http://localhost:54042/api/region/regions/${region.Id}`,
            JSON.stringify({
                Name: region.Name,
                CountryId: region.CountryId,
                Id: region.Id,

            }), opts);
    }

    putPlace(place: Place, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(
            `http://localhost:54042/api/place/places/${place.Id}`,
            JSON.stringify({
                Name: place.Name,
                RegionId: place.RegionId,
                Id: place.Id,

            }), opts);
    }

    //sve delete metode za dobavljanje sa servera
    deleteCountry(country: Country, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(
            `http://localhost:54042/api/country/countries/${country.Id}`,
            opts);
    }

    deleteRegion(region: Region, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(
            `http://localhost:54042/api/region/regions/${region.Id}`,
            opts);
    }

    deletePlace(place: Place, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(
            `http://localhost:54042/api/place/places/${place.Id}`,
            opts);
    }


    approveAccommodation(id: number, access_token: string) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(`http://localhost:54042/api/accommodation/approve/${id}`, {}, opts);
    }


    getManagers(access_token: string){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(`http://localhost:54042/api/Appuser/Users`, opts);
    }

    allowCreating(access_token: string, id: number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(`http://localhost:54042/api/Appuser/update/allow/${id}`, {}, opts);
    }

     preventCreating(access_token: string, id: number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(`http://localhost:54042/api/Appuser/update/permit/${id}`, {}, opts);
    }



}
