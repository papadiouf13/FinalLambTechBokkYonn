import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ILocation } from 'app/entities/location/location.model';
import { LocationService } from 'app/entities/location/service/location.service';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';
import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { ITrip } from '../trip.model';
import { TripService } from '../service/trip.service';
import { TripFormService } from './trip-form.service';

import { TripUpdateComponent } from './trip-update.component';

describe('Trip Management Update Component', () => {
  let comp: TripUpdateComponent;
  let fixture: ComponentFixture<TripUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tripFormService: TripFormService;
  let tripService: TripService;
  let locationService: LocationService;
  let carService: CarService;
  let transporterService: TransporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TripUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TripUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TripUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tripFormService = TestBed.inject(TripFormService);
    tripService = TestBed.inject(TripService);
    locationService = TestBed.inject(LocationService);
    carService = TestBed.inject(CarService);
    transporterService = TestBed.inject(TransporterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Location query and add missing value', () => {
      const trip: ITrip = { id: 456 };
      const departureLocation: ILocation = { id: 14485 };
      trip.departureLocation = departureLocation;
      const arrivalLocation: ILocation = { id: 12096 };
      trip.arrivalLocation = arrivalLocation;

      const locationCollection: ILocation[] = [{ id: 11184 }];
      jest.spyOn(locationService, 'query').mockReturnValue(of(new HttpResponse({ body: locationCollection })));
      const additionalLocations = [departureLocation, arrivalLocation];
      const expectedCollection: ILocation[] = [...additionalLocations, ...locationCollection];
      jest.spyOn(locationService, 'addLocationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      expect(locationService.query).toHaveBeenCalled();
      expect(locationService.addLocationToCollectionIfMissing).toHaveBeenCalledWith(
        locationCollection,
        ...additionalLocations.map(expect.objectContaining),
      );
      expect(comp.locationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Car query and add missing value', () => {
      const trip: ITrip = { id: 456 };
      const car: ICar = { id: 3806 };
      trip.car = car;

      const carCollection: ICar[] = [{ id: 17885 }];
      jest.spyOn(carService, 'query').mockReturnValue(of(new HttpResponse({ body: carCollection })));
      const additionalCars = [car];
      const expectedCollection: ICar[] = [...additionalCars, ...carCollection];
      jest.spyOn(carService, 'addCarToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      expect(carService.query).toHaveBeenCalled();
      expect(carService.addCarToCollectionIfMissing).toHaveBeenCalledWith(carCollection, ...additionalCars.map(expect.objectContaining));
      expect(comp.carsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Transporter query and add missing value', () => {
      const trip: ITrip = { id: 456 };
      const transporter: ITransporter = { id: 14308 };
      trip.transporter = transporter;

      const transporterCollection: ITransporter[] = [{ id: 30557 }];
      jest.spyOn(transporterService, 'query').mockReturnValue(of(new HttpResponse({ body: transporterCollection })));
      const additionalTransporters = [transporter];
      const expectedCollection: ITransporter[] = [...additionalTransporters, ...transporterCollection];
      jest.spyOn(transporterService, 'addTransporterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      expect(transporterService.query).toHaveBeenCalled();
      expect(transporterService.addTransporterToCollectionIfMissing).toHaveBeenCalledWith(
        transporterCollection,
        ...additionalTransporters.map(expect.objectContaining),
      );
      expect(comp.transportersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const trip: ITrip = { id: 456 };
      const departureLocation: ILocation = { id: 26225 };
      trip.departureLocation = departureLocation;
      const arrivalLocation: ILocation = { id: 16630 };
      trip.arrivalLocation = arrivalLocation;
      const car: ICar = { id: 16808 };
      trip.car = car;
      const transporter: ITransporter = { id: 9304 };
      trip.transporter = transporter;

      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      expect(comp.locationsSharedCollection).toContain(departureLocation);
      expect(comp.locationsSharedCollection).toContain(arrivalLocation);
      expect(comp.carsSharedCollection).toContain(car);
      expect(comp.transportersSharedCollection).toContain(transporter);
      expect(comp.trip).toEqual(trip);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrip>>();
      const trip = { id: 123 };
      jest.spyOn(tripFormService, 'getTrip').mockReturnValue(trip);
      jest.spyOn(tripService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trip }));
      saveSubject.complete();

      // THEN
      expect(tripFormService.getTrip).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tripService.update).toHaveBeenCalledWith(expect.objectContaining(trip));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrip>>();
      const trip = { id: 123 };
      jest.spyOn(tripFormService, 'getTrip').mockReturnValue({ id: null });
      jest.spyOn(tripService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trip: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trip }));
      saveSubject.complete();

      // THEN
      expect(tripFormService.getTrip).toHaveBeenCalled();
      expect(tripService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITrip>>();
      const trip = { id: 123 };
      jest.spyOn(tripService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trip });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tripService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLocation', () => {
      it('Should forward to locationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(locationService, 'compareLocation');
        comp.compareLocation(entity, entity2);
        expect(locationService.compareLocation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCar', () => {
      it('Should forward to carService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(carService, 'compareCar');
        comp.compareCar(entity, entity2);
        expect(carService.compareCar).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTransporter', () => {
      it('Should forward to transporterService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(transporterService, 'compareTransporter');
        comp.compareTransporter(entity, entity2);
        expect(transporterService.compareTransporter).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
