import { Component, input, output } from '@angular/core';

import { Place } from '../models/place.model';

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
  // protected url = 'http://localhost:3000/';
  protected url = 'https://3000-actionanand-angularhttp-six5y8k89a8.ws-us116.gitpod.io/';

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
