import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MapService, MapSearchService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    MapService,
    MapSearchService
  ]
})
export class CoreModule { }
