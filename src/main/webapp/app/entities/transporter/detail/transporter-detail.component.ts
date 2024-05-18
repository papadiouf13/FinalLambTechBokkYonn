import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITransporter } from '../transporter.model';

@Component({
  standalone: true,
  selector: 'jhi-transporter-detail',
  templateUrl: './transporter-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TransporterDetailComponent {
  transporter = input<ITransporter | null>(null);

  previousState(): void {
    window.history.back();
  }
}
