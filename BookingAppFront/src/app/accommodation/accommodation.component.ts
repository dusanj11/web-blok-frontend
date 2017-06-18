import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from './accommodation';
import { HttpService } from '../service/http-service';
import { ManagerService } from "app/service/manager-service";

@Component({
    selector: 'app-accommodation',
    templateUrl: './accommodation.component.html',
    styleUrls: ['./accommodation.component.css'],
    providers: [HttpService]
})
export class AccommodationComponent implements OnInit {
    // Klasa dobavlja listu smestaja
    accommodationsAll: Accommodation[] = [];
    accommodations: Accommodation[] = [];

    @Input() accPlace: number;
    pageNumber: number;
    totalNumber: number;
    totalPages: number;
    pageNumbers: number[] = [];

    constructor(private httpService: HttpService, private managerService: ManagerService) {



    }

    // ngOnInit sadrzi poziv ka bazi kako bi se prikupila lista smestaja
    ngOnInit() {
        this.managerService.getAccommodation().subscribe(
            (res: Accommodation[]) => {
                this.accommodationsAll = res;
                console.log(this.accommodations);
                this.pageNumber = 1;
                this.totalNumber = this.accommodationsAll.length;
                this.totalPages = this.totalNumber / 3;
                for (var index = 1; index <= this.totalPages; index++) {
                    this.pageNumbers.push(index);

                }
                //this.pageNumbers = Array(Math.ceil(this.totalPages)).map((x, i) => i);
                this.managerService.getPaginationAccommodation(this.pageNumber).subscribe(
                    (res2: any) => {
                        this.accommodations = JSON.parse(res2._body);
                        console.log(this.accommodations);
                    },
                    error => {
                        alert("Unsuccessful fetch operation!");
                        console.log(error);
                    }
                );

            },
            error => {
                alert("Unsuccessful fetch operation!");
                console.log(error);
            }
        );
    }

    doPaginacija(pageNumber: number) {
        this.managerService.getPaginationAccommodation(pageNumber).subscribe(
            (res2: any) => {
                this.accommodations = JSON.parse(res2._body);
                console.log(this.accommodations);
            },
            error => {
                alert("Unsuccessful fetch operation!");
                console.log(error);
            }
        );
    }

}
