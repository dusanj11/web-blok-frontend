import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IdentityUser } from '../model/identity-user';
import { AppUser } from '../model/app-user';
import { Country } from "app/country/country";
import { Region } from "app/country/region/region";
import { Place } from "app/place/place";
import { Accommodation } from "../accommodation/accommodation";
import { RoomReservation } from "app/room-reservation/room-reservation";

@Injectable()
export class HttpService{

    data: any; //covek ovo ti ne treba

    constructor (private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }


    getUserInfo(username: string, access_token: string): Observable<any> {
        console.log("Username " + username );
        console.log("Token " + access_token);

        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        var url = `http://localhost:54042/api/AppUser/GetUser/${username}`;
        return this.http.get(url, opts).map(this.extractData);
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
            Username: user.Username,
            Name: user.Name,
            Surname: user.Surname,
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

    //sve get metode za dobavljanje sa servera

    getAccommodation(): Observable<any>{
        return this.http.get("http://localhost:54042/api/accommodation/accommodations").map(this.extractData);
    }

    getCountries(): Observable<Country>
    {
        return this.http.get("http://localhost:54042/api/country/countries").map(this.extractData);
    }

    getRegions(): Observable<Region>
    {
        return this.http.get("http://localhost:54042/api/region/regions").map(this.extractData);
    }

    getPlaces(): Observable<Place>
    {
        return this.http.get("http://localhost:54042/api/place/places").map(this.extractData);
    }

    getAccommodationDetails(id: number): Observable<Accommodation>{
        return this.http.get(`http://localhost:54042/api/accommodation/accommodation/${id}`).map(this.extractData);
    }

    postCountry(country: Country): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

         return this.http.post(
        "http://localhost:54042/api/country/countries",
        JSON.stringify({
            Name: country.Name,
            Code: country.Code
        }), opts);
    }


    getRoomsForAccommodation(accommodationId: number){
        return this.http.get(`http://localhost:54042/api/room/rooms/${accommodationId}`).map(this.extractData);
    }
    
    postRegion(region: Region): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        "http://localhost:54042/api/region/regions",
        JSON.stringify({
            Name: region.Name,
            CountryId: region.CountryId
        }), opts);

    }

    postPlace(place: Place): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        "http://localhost:54042/api/place/places",
        JSON.stringify({
            Name: place.Name,
            RegionId: place.RegionId
        }), opts);
    }

    createReservation(reservation: RoomReservation){ 
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
                "http://localhost:54042/api/RoomReservation/roomReservations",
                JSON.stringify({
                    StartDate: reservation.StartDate,
                    EndDate: reservation.EndDate,
                    RoomId: reservation.RoomId,
                    AppUserId: reservation.AppUserId
                }), opts);
    }

    checkIfReservationPass(userName: string, accommodationId: number) {
        return this.http.get(`http://localhost:54042/api/RoomReservation/ReservationPass/${userName}/${accommodationId}`);
    }

}
