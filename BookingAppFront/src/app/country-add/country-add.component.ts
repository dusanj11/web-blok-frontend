import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  ngOnInit() {
  }

  onSubmitCountry(con: Country, form: NgForm)
  {
      this.httpService.postCountry(con).subscribe(
      (conts: any) => {
                //console.log(this.conts);
              },
        error => {
            alert("Unsuccessful post operation!");
            console.log(error);
        }
    );
  }

}
