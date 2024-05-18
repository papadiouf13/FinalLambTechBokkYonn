import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { ICar } from '../car.model';
import { CarService } from '../service/car.service';
import { CarFormService, CarFormGroup } from './car-form.service';

@Component({
  standalone: true,
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;
  car: ICar | null = null;

  transportersSharedCollection: ITransporter[] = [];

  protected carService = inject(CarService);
  protected carFormService = inject(CarFormService);
  protected transporterService = inject(TransporterService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CarFormGroup = this.carFormService.createCarFormGroup();

  compareTransporter = (o1: ITransporter | null, o2: ITransporter | null): boolean => this.transporterService.compareTransporter(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      if (car) {
        this.updateForm(car);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.carFormService.getCar(this.editForm);
    if (car.id !== null) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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

  protected updateForm(car: ICar): void {
    this.car = car;
    this.carFormService.resetForm(this.editForm, car);

    this.transportersSharedCollection = this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(
      this.transportersSharedCollection,
      car.transporter,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.transporterService
      .query()
      .pipe(map((res: HttpResponse<ITransporter[]>) => res.body ?? []))
      .pipe(
        map((transporters: ITransporter[]) =>
          this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(transporters, this.car?.transporter),
        ),
      )
      .subscribe((transporters: ITransporter[]) => (this.transportersSharedCollection = transporters));
  }
}
