import { Component, input, output } from '@angular/core';

import { Place } from '../models/place.model';
import { environment as env } from '../../environments/environment.development';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();

  protected url = env.backendImgUrl;

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
