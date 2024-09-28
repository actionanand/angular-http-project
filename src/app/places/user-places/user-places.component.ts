import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  errorMsg = signal('');

  private placeServ = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  places = this.placeServ.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);

    const availablePlaceSub = this.placeServ.loadUserPlaces().subscribe({
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

  onSelectPlaceRemoce(place: Place) {
    const removePlSub = this.placeServ.removeUserPlace(place).subscribe({
      next: resp => console.log('Place renoved! ', resp),
    });

    this.destroyRef.onDestroy(() => removePlSub.unsubscribe());
  }
}
