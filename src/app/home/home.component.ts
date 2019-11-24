import { Component, OnInit } from '@angular/core';
import { MapService, MapSearchService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private map: MapService,
    private mapSearch: MapSearchService
  ) { }

  ngOnInit() {
    this.map.getMap();
    this.mapSearch.getMapSerach().addTo("#mapSearch");;
  }

}
