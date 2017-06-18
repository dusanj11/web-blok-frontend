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
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { Comment } from "app/comment/comment";

@Injectable()
export class HttpService {


    constructor(private http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    // autorizacija 

    getUserInfo(username: string, access_token: string): Observable<any> {
        console.log("Username " + username);
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

    registerUser(user: IdentityUser): Observable<any> {
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

    signInUser(user: any): Observable<any> {
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
            body, opts);
    }

    checkIfReservationPass(userName: string, accommodationId: number) {
        return this.http.get(`http://localhost:54042/api/RoomReservation/ReservationPass/${userName}/${accommodationId}`);
    }

    getAccommodationComments(accomId: number): Observable<any> {
        return this.http.get(`http://localhost:54042/api/comment/comments/${accomId}`);
    }


    createReservation(reservation: RoomReservation, access_token: string) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

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

    createComment(comment: Comment, access_token: string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            "http://localhost:54042/api/comment/comments",
            JSON.stringify({
                Grade: comment.Grade,
                Text: comment.Text,
                AccommodationId: comment.AccomodationId,
                AppUserId: comment.AppUserId
            }), opts);

    }

    //filtriranje
    getFilteredAccommodation(name: string): Observable<any>
    {
        // return this.http.get("http://localhost:54042/api/accommodation/accommodations?$filter=substringof(\'"+name+"\'"+",Name" +')');
        return this.http.get(`http://localhost:54042/api/accommodation/accommodations?$filter=substringof(\'$(name)\',Name)`);
    }

}
