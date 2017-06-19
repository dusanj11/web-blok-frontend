import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from './accommodation';
import { HttpService } from '../service/http-service';
import { ManagerService } from "app/service/manager-service";
import { NotificationService } from "ng2-notify-popup";

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
   

    constructor(private notifService: NotificationService, private httpService: HttpService, private managerService: ManagerService) {



    }

    // ngOnInit sadrzi poziv ka bazi kako bi se prikupila lista smestaja
    ngOnInit() {
        this.httpService.getApprovedAccommodations().subscribe(
            (res: any) => {
                this.accommodationsAll = res;
                console.log(this.accommodations);
                
            },
            error => {
                //alert("Unsuccessful fetch operation!");
                this.notifService.show("Error fetching all accommodations!", {type: 'error', position:'bottom'});

                console.log(error);
            }
        );
    }

    

}
