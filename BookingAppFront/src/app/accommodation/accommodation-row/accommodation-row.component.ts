import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Accommodation } from '../accommodation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accommodation-row',
  templateUrl: './accommodation-row.component.html',
  styleUrls: ['./accommodation-row.component.css']
})
export class AccommodationRowComponent implements OnInit {

  @Input() accommodation: Accommodation;

  id: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {this.id = params['id']; });
  }

  showDetails(id: number): void{
    console.log("Kliknuo na "  + id);
    this.router.navigate(['/accommodation-details/'+ id]);
  }

  ngOnInit() {
  }

}
