import { Component, OnInit,Input } from '@angular/core';
import { Accommodation } from './accommodation';
import { HttpService } from '../service/http-service';

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

  // konstruktorom hardkodovana lista smestaja koja bi inace trebalo da se preuzme u onInit metodi
  constructor(private httpService: HttpService) {

        // this.accommodations = [
        //     new Accommodation(1,
        //                       "Accommodation 1",
        //                       "Accommodation 1 description",
        //                       "Accommodation 1 address",
        //                       10,
        //                       50,
        //                       50,
        //                       "/assets/images/download.jpg",
        //                       true,
        //                       2,
        //                       3,
        //                       1
        //                     ),
        //      new Accommodation(2,
        //                        "Accommodation 2",
        //                        "Accommodation 2 description",
        //                        "Accommodation 2 address",
        //                        10,
        //                        50,
        //                        50,
        //                        "/assets/images/download.jpg",
        //                        true,
        //                        2,
        //                        3,
        //                        1
        //                      ),
        //     new Accommodation(3,
        //                       "Accommodation 3",
        //                       "Accommodation 3 description",
        //                       "Accommodation 3 address",
        //                       10,
        //                       50,
        //                       50,
        //                       "/assets/images/download.jpg",
        //                       true,
        //                       3,
        //                       3,
        //                       1
        //                     ),
        //   new Accommodation(4,
        //                     "Accommodation 4",
        //                     "Accommodation 4 description",
        //                     "Accommodation 4 address",
        //                     10,
        //                     50,
        //                     50,
        //                     "/assets/images/download.jpg",
        //                     true,
        //                     5,
        //                     3,
        //                     1
        //                   ),
        // new Accommodation(5,
        //                   "Accommodation 5",
        //                   "Accommodation 5 description",
        //                   "Accommodation 5 address",
        //                   10,
        //                   50,
        //                   50,
        //                   "/assets/images/download.jpg",
        //                   true,
        //                   5,
        //                   3,
        //                   1
        //                 ),
        // new Accommodation(6,
        //                   "Accommodation 6",
        //                   "Accommodation 6 description",
        //                   "Accommodation 6 address",
        //                   10,
        //                   50,
        //                   50,
        //                   "/assets/images/download.jpg",
        //                   true,
        //                   6,
        //                   3,
        //                   1
        //                 )
        // ];

  }

  // ngOnInit sadrzi poziv ka bazi kako bi se prikupila lista smestaja
  ngOnInit() {
      this.httpService.getAccommodation().subscribe(
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
