import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISeat, NewSeat } from '../seat.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISeat for edit and NewSeatFormGroupInput for create.
 */
type SeatFormGroupInput = ISeat | PartialWithRequiredKeyOf<NewSeat>;

type SeatFormDefaults = Pick<NewSeat, 'id' | 'isAvailable'>;

type SeatFormGroupContent = {
  id: FormControl<ISeat['id'] | NewSeat['id']>;
  seatNumber: FormControl<ISeat['seatNumber']>;
  isAvailable: FormControl<ISeat['isAvailable']>;
  car: FormControl<ISeat['car']>;
};

export type SeatFormGroup = FormGroup<SeatFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SeatFormService {
  createSeatFormGroup(seat: SeatFormGroupInput = { id: null }): SeatFormGroup {
    const seatRawValue = {
      ...this.getFormDefaults(),
      ...seat,
    };
    return new FormGroup<SeatFormGroupContent>({
      id: new FormControl(
        { value: seatRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      seatNumber: new FormControl(seatRawValue.seatNumber),
      isAvailable: new FormControl(seatRawValue.isAvailable),
      car: new FormControl(seatRawValue.car),
    });
  }

  getSeat(form: SeatFormGroup): ISeat | NewSeat {
    return form.getRawValue() as ISeat | NewSeat;
  }

  resetForm(form: SeatFormGroup, seat: SeatFormGroupInput): void {
    const seatRawValue = { ...this.getFormDefaults(), ...seat };
    form.reset(
      {
        ...seatRawValue,
        id: { value: seatRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SeatFormDefaults {
    return {
      id: null,
      isAvailable: false,
    };
  }
}
