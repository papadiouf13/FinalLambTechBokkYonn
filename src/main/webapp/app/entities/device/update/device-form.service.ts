import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDevice, NewDevice } from '../device.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDevice for edit and NewDeviceFormGroupInput for create.
 */
type DeviceFormGroupInput = IDevice | PartialWithRequiredKeyOf<NewDevice>;

type DeviceFormDefaults = Pick<NewDevice, 'id' | 'isActive'>;

type DeviceFormGroupContent = {
  id: FormControl<IDevice['id'] | NewDevice['id']>;
  platform: FormControl<IDevice['platform']>;
  brand: FormControl<IDevice['brand']>;
  token: FormControl<IDevice['token']>;
  model: FormControl<IDevice['model']>;
  osVersion: FormControl<IDevice['osVersion']>;
  isActive: FormControl<IDevice['isActive']>;
  createdAt: FormControl<IDevice['createdAt']>;
  updatedAt: FormControl<IDevice['updatedAt']>;
};

export type DeviceFormGroup = FormGroup<DeviceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeviceFormService {
  createDeviceFormGroup(device: DeviceFormGroupInput = { id: null }): DeviceFormGroup {
    const deviceRawValue = {
      ...this.getFormDefaults(),
      ...device,
    };
    return new FormGroup<DeviceFormGroupContent>({
      id: new FormControl(
        { value: deviceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      platform: new FormControl(deviceRawValue.platform),
      brand: new FormControl(deviceRawValue.brand),
      token: new FormControl(deviceRawValue.token, {
        validators: [Validators.required],
      }),
      model: new FormControl(deviceRawValue.model),
      osVersion: new FormControl(deviceRawValue.osVersion),
      isActive: new FormControl(deviceRawValue.isActive),
      createdAt: new FormControl(deviceRawValue.createdAt),
      updatedAt: new FormControl(deviceRawValue.updatedAt),
    });
  }

  getDevice(form: DeviceFormGroup): IDevice | NewDevice {
    return form.getRawValue() as IDevice | NewDevice;
  }

  resetForm(form: DeviceFormGroup, device: DeviceFormGroupInput): void {
    const deviceRawValue = { ...this.getFormDefaults(), ...device };
    form.reset(
      {
        ...deviceRawValue,
        id: { value: deviceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DeviceFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
