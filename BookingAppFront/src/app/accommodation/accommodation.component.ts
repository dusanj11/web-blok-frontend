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
    accommodations: Accommodation[];

    @Input() accPlace: number;
  
    constructor(private httpService: HttpService, private managerService: ManagerService) {

    }

    // ngOnInit sadrzi poziv ka bazi kako bi se prikupila lista smestaja
    ngOnInit() {
        this.managerService.getAccommodation().subscribe(
            (res: Accommodation[]) => {
                this.accommodations = res;
                console.log(this.accommodations);
            },
            error => {
                alert("Unsuccessful fetch operation!");
                console.log(error);
            }
        );
    }

}
