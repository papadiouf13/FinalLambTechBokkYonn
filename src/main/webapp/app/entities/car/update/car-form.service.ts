import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICar, NewCar } from '../car.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICar for edit and NewCarFormGroupInput for create.
 */
type CarFormGroupInput = ICar | PartialWithRequiredKeyOf<NewCar>;

type CarFormDefaults = Pick<NewCar, 'id' | 'isActive'>;

type CarFormGroupContent = {
  id: FormControl<ICar['id'] | NewCar['id']>;
  name: FormControl<ICar['name']>;
  description: FormControl<ICar['description']>;
  numberOfSeats: FormControl<ICar['numberOfSeats']>;
  numberOfAvailableSeats: FormControl<ICar['numberOfAvailableSeats']>;
  isActive: FormControl<ICar['isActive']>;
  plateNumber: FormControl<ICar['plateNumber']>;
  transporter: FormControl<ICar['transporter']>;
};

export type CarFormGroup = FormGroup<CarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CarFormService {
  createCarFormGroup(car: CarFormGroupInput = { id: null }): CarFormGroup {
    const carRawValue = {
      ...this.getFormDefaults(),
      ...car,
    };
    return new FormGroup<CarFormGroupContent>({
      id: new FormControl(
        { value: carRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(carRawValue.name),
      description: new FormControl(carRawValue.description),
      numberOfSeats: new FormControl(carRawValue.numberOfSeats),
      numberOfAvailableSeats: new FormControl(carRawValue.numberOfAvailableSeats),
      isActive: new FormControl(carRawValue.isActive),
      plateNumber: new FormControl(carRawValue.plateNumber),
      transporter: new FormControl(carRawValue.transporter),
    });
  }

  getCar(form: CarFormGroup): ICar | NewCar {
    return form.getRawValue() as ICar | NewCar;
  }

  resetForm(form: CarFormGroup, car: CarFormGroupInput): void {
    const carRawValue = { ...this.getFormDefaults(), ...car };
    form.reset(
      {
        ...carRawValue,
        id: { value: carRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CarFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
