/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Place } from '../models/place.model';
import { ErrorService } from './error.service';
import { environment as env } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();

  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);

  loadAvailablePlaces() {
    return this.fetchPlaces(env.backendUrl + 'places.json', 'Error loading available places!');
  }

  loadUserPlaces() {
    return this.fetchPlaces(env.backendUrl + 'user-places.json', 'Error loading user places!').pipe(
      tap({
        next: resp => {
          if (resp) {
            this.userPlaces.set(resp);
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
      .put(env.backendUrl + 'user-places', {
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

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some(p => p.id === place.id)) {
      // optimistic update
      this.userPlaces.set(prevPlaces.filter(pl => pl.id !== place.id));
    }

    return this.http.delete(env.backendUrl + 'user-places/' + place.id).pipe(
      catchError(err => {
        this.userPlaces.set(prevPlaces);
        this.errorServ.showError('Unable to remove the selected place!');
        return throwError(() => new Error('Unable to remove the selected place!'));
      }),
    );
  }

  private fetchPlaces(url: string, errMsg: string) {
    return this.http
      .get<Place[]>(url, {
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
