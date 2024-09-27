import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../../models/place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../../services/places.service';

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
  errorMsg = signal('');

  private placeServ = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);

    const availablePlaceSub = this.placeServ.loadAvailablePlaces().subscribe({
      next: resp => {
        this.places.set(resp?.places);
        this.errorMsg.set('');
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (err: Error) => {
        console.error(err.message);
        this.errorMsg.set(err.message);
      },
    });

    this.destroyRef.onDestroy(() => availablePlaceSub.unsubscribe());
  }

  onSelectPlaces(selectedPlace: Place) {
    const selectPlaceSub = this.placeServ.addPlaceToUserPlaces(selectedPlace.id).subscribe({
      next: resp => console.log('Place added. ', resp),
    });

    this.destroyRef.onDestroy(() => selectPlaceSub.unsubscribe());
  }
}
