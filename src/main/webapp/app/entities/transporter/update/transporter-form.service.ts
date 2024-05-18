import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITransporter, NewTransporter } from '../transporter.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransporter for edit and NewTransporterFormGroupInput for create.
 */
type TransporterFormGroupInput = ITransporter | PartialWithRequiredKeyOf<NewTransporter>;

type TransporterFormDefaults = Pick<NewTransporter, 'id' | 'isActive'>;

type TransporterFormGroupContent = {
  id: FormControl<ITransporter['id'] | NewTransporter['id']>;
  name: FormControl<ITransporter['name']>;
  avatar: FormControl<ITransporter['avatar']>;
  phoneNumber: FormControl<ITransporter['phoneNumber']>;
  isActive: FormControl<ITransporter['isActive']>;
};

export type TransporterFormGroup = FormGroup<TransporterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransporterFormService {
  createTransporterFormGroup(transporter: TransporterFormGroupInput = { id: null }): TransporterFormGroup {
    const transporterRawValue = {
      ...this.getFormDefaults(),
      ...transporter,
    };
    return new FormGroup<TransporterFormGroupContent>({
      id: new FormControl(
        { value: transporterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(transporterRawValue.name),
      avatar: new FormControl(transporterRawValue.avatar),
      phoneNumber: new FormControl(transporterRawValue.phoneNumber),
      isActive: new FormControl(transporterRawValue.isActive),
    });
  }

  getTransporter(form: TransporterFormGroup): ITransporter | NewTransporter {
    return form.getRawValue() as ITransporter | NewTransporter;
  }

  resetForm(form: TransporterFormGroup, transporter: TransporterFormGroupInput): void {
    const transporterRawValue = { ...this.getFormDefaults(), ...transporter };
    form.reset(
      {
        ...transporterRawValue,
        id: { value: transporterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TransporterFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
