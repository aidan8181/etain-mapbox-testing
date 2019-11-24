import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MapService } from './map.service';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  private mapSearch: MapboxGeocoder;
  private readonly banksJson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {"type": "Point", "coordinates": [-5.931941, 54.596195]}
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {"type": "Point", "coordinates": [-5.928851, 54.5958]}
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {"type": "Point", "coordinates": [-5.928111, 54.596571]}
      }
    ]
  };

  constructor(
    private map: MapService
  ) { }

  getMapSerach(): MapboxGeocoder {
    if (!this.mapSearch){
      this.mapSearch = this.createMapSearch();
    }

    return this.mapSearch;
  }

  private createMapSearch(): MapboxGeocoder {
    const customMapSearch = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      container: 'app-map-search',
      filter: this.northernIrelandMapFilter,
      mapboxgl: mapboxgl
    });

    customMapSearch.setCountries('gb');
    customMapSearch.onAdd(this.map.getMap());
    customMapSearch.on('result', () => {
      this.placeBanks();
    });

    return customMapSearch;
  }

  northernIrelandMapFilter(item) {
    return item.context.map((i) => {
        return (i.id.split('.').shift() === 'region' && i.text === 'Northern Ireland');
      }).reduce(function (acc, cur) {
        return acc || cur;
      });
  }

  private placeBanks() {
    var geoJson = this.banksJson;

    geoJson.features.forEach((marker) => {
      var el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
        .addTo(this.map.getMap());
    });
  }
}
