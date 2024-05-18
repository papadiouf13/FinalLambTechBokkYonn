import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITrip } from '../trip.model';

@Component({
  standalone: true,
  selector: 'jhi-trip-detail',
  templateUrl: './trip-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TripDetailComponent {
  trip = input<ITrip | null>(null);

  previousState(): void {
    window.history.back();
  }
}
