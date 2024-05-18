import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { TripStatus } from 'app/entities/enumerations/trip-status.model';
import { TripService } from '../service/trip.service';
import { ITrip } from '../trip.model';
import { TripFormService, TripFormGroup } from './trip-form.service';

@Component({
  standalone: true,
  selector: 'jhi-trip-update',
  templateUrl: './trip-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TripUpdateComponent implements OnInit {
  isSaving = false;
  trip: ITrip | null = null;
  tripStatusValues = Object.keys(TripStatus);

  locationsSharedCollection: ILocation[] = [];
  carsSharedCollection: ICar[] = [];
  transportersSharedCollection: ITransporter[] = [];

  protected tripService = inject(TripService);
  protected tripFormService = inject(TripFormService);
  protected locationService = inject(LocationService);
  protected carService = inject(CarService);
  protected transporterService = inject(TransporterService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TripFormGroup = this.tripFormService.createTripFormGroup();

  compareLocation = (o1: ILocation | null, o2: ILocation | null): boolean => this.locationService.compareLocation(o1, o2);

  compareCar = (o1: ICar | null, o2: ICar | null): boolean => this.carService.compareCar(o1, o2);

  compareTransporter = (o1: ITransporter | null, o2: ITransporter | null): boolean => this.transporterService.compareTransporter(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trip }) => {
      this.trip = trip;
      if (trip) {
        this.updateForm(trip);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trip = this.tripFormService.getTrip(this.editForm);
    if (trip.id !== null) {
      this.subscribeToSaveResponse(this.tripService.update(trip));
    } else {
      this.subscribeToSaveResponse(this.tripService.create(trip));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrip>>): void {
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

  protected updateForm(trip: ITrip): void {
    this.trip = trip;
    this.tripFormService.resetForm(this.editForm, trip);

    this.locationsSharedCollection = this.locationService.addLocationToCollectionIfMissing<ILocation>(
      this.locationsSharedCollection,
      trip.departureLocation,
      trip.arrivalLocation,
    );
    this.carsSharedCollection = this.carService.addCarToCollectionIfMissing<ICar>(this.carsSharedCollection, trip.car);
    this.transportersSharedCollection = this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(
      this.transportersSharedCollection,
      trip.transporter,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.locationService
      .query()
      .pipe(map((res: HttpResponse<ILocation[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocation[]) =>
          this.locationService.addLocationToCollectionIfMissing<ILocation>(
            locations,
            this.trip?.departureLocation,
            this.trip?.arrivalLocation,
          ),
        ),
      )
      .subscribe((locations: ILocation[]) => (this.locationsSharedCollection = locations));

    this.carService
      .query()
      .pipe(map((res: HttpResponse<ICar[]>) => res.body ?? []))
      .pipe(map((cars: ICar[]) => this.carService.addCarToCollectionIfMissing<ICar>(cars, this.trip?.car)))
      .subscribe((cars: ICar[]) => (this.carsSharedCollection = cars));

    this.transporterService
      .query()
      .pipe(map((res: HttpResponse<ITransporter[]>) => res.body ?? []))
      .pipe(
        map((transporters: ITransporter[]) =>
          this.transporterService.addTransporterToCollectionIfMissing<ITransporter>(transporters, this.trip?.transporter),
        ),
      )
      .subscribe((transporters: ITransporter[]) => (this.transportersSharedCollection = transporters));
  }
}
