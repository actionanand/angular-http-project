/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Place } from '../models/place.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);

  loadAvailablePlaces() {
    return this.fetchPlaces('/api/v2/places', 'Error loading available places!');
  }

  loadUserPlaces() {
    return this.fetchPlaces('/api/v2/user-places', 'Error loading user places!').pipe(
      tap({
        next: resp => {
          if (resp) {
            this.userPlaces.set(resp.places);
          }
        },
      }),
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some(p => p.id === place.id)) {
      // optimistic update
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.http
      .put('/api/v2/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError(err => {
          this.userPlaces.set(prevPlaces);
          this.errorServ.showError('Unable to store the selected place!');
          return throwError(() => new Error('Unable to store the selected place!'));
        }),
      );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errMsg: string) {
    return this.http
      .get<{ places: Place[] }>(url, {
        observe: 'response', // it'll give full response including status code
      })
      .pipe(
        tap(rawResp => {
          console.log('Raw Response: ', rawResp);
        }),
        map(data => data.body),
        catchError(error => {
          console.error(error);
          return throwError(() => new Error(errMsg));
        }),
      );
  }
}
