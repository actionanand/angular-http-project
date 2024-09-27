/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, signal } from '@angular/core';

import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private readonly url = '/api/v2/places';

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {}

  loadUserPlaces() {}

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}
}
