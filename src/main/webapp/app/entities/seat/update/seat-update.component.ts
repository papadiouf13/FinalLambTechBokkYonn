import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';
import { ISeat } from '../seat.model';
import { SeatService } from '../service/seat.service';
import { SeatFormService, SeatFormGroup } from './seat-form.service';

@Component({
  standalone: true,
  selector: 'jhi-seat-update',
  templateUrl: './seat-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SeatUpdateComponent implements OnInit {
  isSaving = false;
  seat: ISeat | null = null;

  carsSharedCollection: ICar[] = [];

  protected seatService = inject(SeatService);
  protected seatFormService = inject(SeatFormService);
  protected carService = inject(CarService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SeatFormGroup = this.seatFormService.createSeatFormGroup();

  compareCar = (o1: ICar | null, o2: ICar | null): boolean => this.carService.compareCar(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seat }) => {
      this.seat = seat;
      if (seat) {
        this.updateForm(seat);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seat = this.seatFormService.getSeat(this.editForm);
    if (seat.id !== null) {
      this.subscribeToSaveResponse(this.seatService.update(seat));
    } else {
      this.subscribeToSaveResponse(this.seatService.create(seat));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeat>>): void {
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

  protected updateForm(seat: ISeat): void {
    this.seat = seat;
    this.seatFormService.resetForm(this.editForm, seat);

    this.carsSharedCollection = this.carService.addCarToCollectionIfMissing<ICar>(this.carsSharedCollection, seat.car);
  }

  protected loadRelationshipsOptions(): void {
    this.carService
      .query()
      .pipe(map((res: HttpResponse<ICar[]>) => res.body ?? []))
      .pipe(map((cars: ICar[]) => this.carService.addCarToCollectionIfMissing<ICar>(cars, this.seat?.car)))
      .subscribe((cars: ICar[]) => (this.carsSharedCollection = cars));
  }
}
