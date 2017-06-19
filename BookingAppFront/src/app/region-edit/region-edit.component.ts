import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {

  countries: Country[];
  regions: Region[];
  model: any = {};
  country: Country;
  region: Region;

  constructor(private notifService: NotificationService, private httpService: HttpService, private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {

    this.adminService.getCountries().subscribe(
      (conts: any) => {
        this.countries = conts;
        //console.log(this.countries)
        this.adminService.getRegions().subscribe(
          (regs: any) => {
            this.regions = regs;
            //console.log(this.countries)
            this.regions.forEach(elementR => {

              this.countries.forEach(elementC => {

                if (elementR.CountryId == elementC.Id) {
                  elementR.CountryName = elementC.Name;
                }
              });
            });
          },
          error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching regions!", {type: 'error', position:'bottom'});

            console.log(error);
          }
        );
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching countries!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );


  }

  deleteRegion(regionId: number) {
    this.regions.forEach(element => {
      if (element.Id == regionId) {
        this.region = element;
      }
    });

    let access_token: string = this.authService.currentUserToken();

    this.adminService.deleteRegion(this.region, access_token).subscribe(
      (regs: any) => {
        // this.countries = conts;
        //console.log(this.countries)
        this.notifService.show("Successfully deleted region!", {type: 'success', position:'bottom'});
        this.ngOnInit();
      },
      error => {
        // alert("Unsuccessful delete operation!");
        this.notifService.show("Error fetching region!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );

    // this.ngOnInit();
  }

  editRegion(regionId: number) {
    this.regions.forEach(element => {
      if (element.Id == regionId) {
        this.region = element;
      }
    });

    this.model.Name = this.region.Name;
    this.model.CountryName = this.region.CountryName;

    console.log(this.region.Id + " " + this.region.Name + " " + this.region.CountryName);

  }

  updateRegion() {
    this.region.Name = this.model.Name;
    this.region.CountryName = this.model.CountryName;

    this.countries.forEach(element => {
      if (element.Name == this.region.CountryName) {
        this.region.CountryId = element.Id;
      }
    });

    let access_token: string = this.authService.currentUserToken();
    this.adminService.putRegion(this.region, access_token).subscribe(
      (regs: any) => {
        // this.countries = conts;
        console.log(this.regions)
        this.notifService.show("Successfully edited region!", {type: 'success', position:'bottom'});
            
        this.model = {};
        this.ngOnInit();
      },
      error => {
        // alert("Unsuccessful put operation!");
        this.notifService.show("Error editing region!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );

    // this.ngOnInit();
  }

}
