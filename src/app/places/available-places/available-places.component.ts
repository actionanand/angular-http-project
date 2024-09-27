import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';

import { Place } from '../../models/place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);

    const availablePlaceSub = this.http
      .get<{ places: Place[] }>('/api/v2/places', {
        observe: 'response',
      })
      .pipe(
        tap(rawResp => {
          console.log('Raw Response: ', rawResp);
        }),
        map(data => data.body),
      )
      .subscribe({
        next: resp => {
          this.places.set(resp?.places);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => availablePlaceSub.unsubscribe());
  }
}
