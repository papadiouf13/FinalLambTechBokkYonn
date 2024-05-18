import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReservation, NewReservation } from '../reservation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReservation for edit and NewReservationFormGroupInput for create.
 */
type ReservationFormGroupInput = IReservation | PartialWithRequiredKeyOf<NewReservation>;

type ReservationFormDefaults = Pick<NewReservation, 'id'>;

type ReservationFormGroupContent = {
  id: FormControl<IReservation['id'] | NewReservation['id']>;
  departureTimme: FormControl<IReservation['departureTimme']>;
  status: FormControl<IReservation['status']>;
  reservationNumber: FormControl<IReservation['reservationNumber']>;
  trip: FormControl<IReservation['trip']>;
  seat: FormControl<IReservation['seat']>;
};

export type ReservationFormGroup = FormGroup<ReservationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReservationFormService {
  createReservationFormGroup(reservation: ReservationFormGroupInput = { id: null }): ReservationFormGroup {
    const reservationRawValue = {
      ...this.getFormDefaults(),
      ...reservation,
    };
    return new FormGroup<ReservationFormGroupContent>({
      id: new FormControl(
        { value: reservationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      departureTimme: new FormControl(reservationRawValue.departureTimme),
      status: new FormControl(reservationRawValue.status),
      reservationNumber: new FormControl(reservationRawValue.reservationNumber),
      trip: new FormControl(reservationRawValue.trip),
      seat: new FormControl(reservationRawValue.seat),
    });
  }

  getReservation(form: ReservationFormGroup): IReservation | NewReservation {
    return form.getRawValue() as IReservation | NewReservation;
  }

  resetForm(form: ReservationFormGroup, reservation: ReservationFormGroupInput): void {
    const reservationRawValue = { ...this.getFormDefaults(), ...reservation };
    form.reset(
      {
        ...reservationRawValue,
        id: { value: reservationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReservationFormDefaults {
    return {
      id: null,
    };
  }
}
