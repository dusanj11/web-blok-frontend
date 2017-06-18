import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from "rxjs/Observable";
import { Accommodation } from "app/accommodation/accommodation";
import 'rxjs/add/operator/map';
import { Place } from "app/place/place";
import { Region } from "app/country/region/region";
import { Country } from "app/country/country";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { Injectable } from '@angular/core';
import { Room } from "app/room/room";

@Injectable()
export class ManagerService {

    constructor (private http: Http){}

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getAccommodation(): Observable<any>{
        return this.http.get("http://localhost:54042/api/accommodation/accommodations").map(this.extractData);
    }
    
    getPaginationAccommodation(pgNumber: number): Observable<any>
    {
        let skipNumber: number;
        skipNumber = pgNumber*3 - 3;
        // return this.http.get("http://localhost:54042/api/accommodation/accommodations?$filter=substringof(\'"+name+"\'"+",Name" +')');
        return this.http.get(`http://localhost:54042/odata/AccommodationsPaging?$top=3&$skip=${skipNumber}&$inlinecount=allpages`);
    }

    getAccommodationDetails(id: number): Observable<Accommodation>{
        return this.http.get(`http://localhost:54042/api/accommodation/accommodation/${id}`).map(this.extractData);
    }

    getRoomsForAccommodation(accommodationId: number){
        return this.http.get(`http://localhost:54042/api/room/rooms/${accommodationId}`).map(this.extractData);
    }

    getAccommodationTypes(): Observable<Accommodation>{
        return this.http.get("http://localhost:54042/api/acctype/acctypes").map(this.extractData);
    }

    getRooms(): Observable<Room>{
        return this.http.get("http://localhost:54042/api/room/rooms").map(this.extractData);
    }

   


    postAccommodation(accommodation: Accommodation, access_token: string): Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        "http://localhost:54042/api/accommodation/accommodations",
        JSON.stringify({
            Name: accommodation.Name,
            Description: accommodation.Description,
            Address: accommodation.Address,
            AverageGrade: 0,
            Latitude: accommodation.Latitude,
            Longitute: accommodation.Longitude,
            ImageURL: `http://localhost:54042/content/${accommodation.ImageURL}`,
            Approved: accommodation.Approved,
            PlaceId: accommodation.PlaceId,
            AccommodationTypeId: accommodation.AccommodationTypeId,
            AppUserId: accommodation.AppUserId

        }), opts);
    }

    postRoom(room: Room, access_token: string): Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        "http://localhost:54042/api/room/rooms",
        JSON.stringify({
            RoomNumber: room.RoomNumber,
            BedCount: room.BedCount,
            PricePerNight: room.PricePerNight,
            Description: room.Description,
            AccommodationId: room.AccommodationId
        }), opts);
    }

    postAccommodationType(accommodationType: AccomodationType, access_token: string): Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
        "http://localhost:54042/api/acctype/acctypes",
        JSON.stringify({
            Name: accommodationType.Name
        }), opts);
    }
    

    putAccommodationType(acctype: AccomodationType, access_token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(
        `http://localhost:54042/api/acctype/acctypes/${acctype.Id}`,
        JSON.stringify({
            Name: acctype.Name,
            Id: acctype.Id,

        }), opts);
    }

    putRoom(room: Room, access_token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(
        `http://localhost:54042/api/room/rooms/${room.Id}`,
        JSON.stringify({
            RoomNumber: room.RoomNumber,
            Id: room.Id,
            BedCount: room.BedCount,
            PricePerNight: room.PricePerNight,
            Description: room.Description,
            AccommodationId: room.AccommodationId

        }), opts);
    }

    putAccommodation(accommodation: Accommodation, access_token: string){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        // let imageUrl: string = "";
        // if (accommodation.ImageURL != ""){
        //     imageUrl = `http://localhost:54042/content/${accommodation.Id}/${accommodation.ImageURL}`;
        // }

        return this.http.put(
        `http://localhost:54042/api/accommodation/accommodations/${accommodation.Id}`,
        JSON.stringify({
            Id: accommodation.Id,
            Name: accommodation.Name,
            Description: accommodation.Description,
            Address: accommodation.Address,
            AverageGrade: 0,
            Latitude: accommodation.Latitude,
            Longitute: accommodation.Longitude,
            ImageURL: accommodation.ImageURL,
            Approved: accommodation.Approved,
            PlaceId: accommodation.PlaceId,
            AccommodationTypeId: accommodation.AccommodationTypeId,
            AppUserId: accommodation.AppUserId

        }), opts);
    }

    deleteAccommodationType(acctype: AccomodationType, access_token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(
        `http://localhost:54042/api/acctype/acctypes/${acctype.Id}`,
         opts);
    }

    deleteRoom(room: Room,  access_token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(
        `http://localhost:54042/api/room/rooms/${room.Id}`,
         opts);

    }

    deleteAccommodation(accommodation: Accommodation, access_token: string): Observable<any>
    {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(`http://localhost:54042/api/accommodation/delete/${accommodation.Id}`,opts);
    }

}
