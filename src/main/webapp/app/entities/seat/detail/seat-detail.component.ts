import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISeat } from '../seat.model';

@Component({
  standalone: true,
  selector: 'jhi-seat-detail',
  templateUrl: './seat-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SeatDetailComponent {
  seat = input<ISeat | null>(null);

  previousState(): void {
    window.history.back();
  }
}
