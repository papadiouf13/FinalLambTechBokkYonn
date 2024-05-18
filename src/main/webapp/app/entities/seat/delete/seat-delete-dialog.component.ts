import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISeat } from '../seat.model';
import { SeatService } from '../service/seat.service';

@Component({
  standalone: true,
  templateUrl: './seat-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SeatDeleteDialogComponent {
  seat?: ISeat;

  protected seatService = inject(SeatService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seatService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
