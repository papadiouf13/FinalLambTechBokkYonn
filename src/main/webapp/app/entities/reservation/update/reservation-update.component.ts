import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITrip } from 'app/entities/trip/trip.model';
import { TripService } from 'app/entities/trip/service/trip.service';
import { ISeat } from 'app/entities/seat/seat.model';
import { SeatService } from 'app/entities/seat/service/seat.service';
import { ReservationStatus } from 'app/entities/enumerations/reservation-status.model';
import { ReservationService } from '../service/reservation.service';
import { IReservation } from '../reservation.model';
import { ReservationFormService, ReservationFormGroup } from './reservation-form.service';

@Component({
  standalone: true,
  selector: 'jhi-reservation-update',
  templateUrl: './reservation-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ReservationUpdateComponent implements OnInit {
  isSaving = false;
  reservation: IReservation | null = null;
  reservationStatusValues = Object.keys(ReservationStatus);

  tripsSharedCollection: ITrip[] = [];
  seatsSharedCollection: ISeat[] = [];

  protected reservationService = inject(ReservationService);
  protected reservationFormService = inject(ReservationFormService);
  protected tripService = inject(TripService);
  protected seatService = inject(SeatService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ReservationFormGroup = this.reservationFormService.createReservationFormGroup();

  compareTrip = (o1: ITrip | null, o2: ITrip | null): boolean => this.tripService.compareTrip(o1, o2);

  compareSeat = (o1: ISeat | null, o2: ISeat | null): boolean => this.seatService.compareSeat(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservation }) => {
      this.reservation = reservation;
      if (reservation) {
        this.updateForm(reservation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservation = this.reservationFormService.getReservation(this.editForm);
    if (reservation.id !== null) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(reservation: IReservation): void {
    this.reservation = reservation;
    this.reservationFormService.resetForm(this.editForm, reservation);

    this.tripsSharedCollection = this.tripService.addTripToCollectionIfMissing<ITrip>(this.tripsSharedCollection, reservation.trip);
    this.seatsSharedCollection = this.seatService.addSeatToCollectionIfMissing<ISeat>(this.seatsSharedCollection, reservation.seat);
  }

  protected loadRelationshipsOptions(): void {
    this.tripService
      .query()
      .pipe(map((res: HttpResponse<ITrip[]>) => res.body ?? []))
      .pipe(map((trips: ITrip[]) => this.tripService.addTripToCollectionIfMissing<ITrip>(trips, this.reservation?.trip)))
      .subscribe((trips: ITrip[]) => (this.tripsSharedCollection = trips));

    this.seatService
      .query()
      .pipe(map((res: HttpResponse<ISeat[]>) => res.body ?? []))
      .pipe(map((seats: ISeat[]) => this.seatService.addSeatToCollectionIfMissing<ISeat>(seats, this.reservation?.seat)))
      .subscribe((seats: ISeat[]) => (this.seatsSharedCollection = seats));
  }
}
