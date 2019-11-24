import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/streets-v11';
  private lat = 54.5900;
  private lng =  -6.9000;

  constructor() {}

  getMap(): mapboxgl.Map {
    if (!this.map) {
      this.map = this.createMap();
    }

    return this.map;
  }

  private createMap(): mapboxgl.Map {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    const customMapBox = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 7.5,
      center: [this.lng, this.lat]
    });

    this.addMapControls(customMapBox);
    
    return customMapBox;
  }

  private addMapControls(customMapBox: mapboxgl.Map) {
    customMapBox.addControl(new mapboxgl.NavigationControl());
  }
}
