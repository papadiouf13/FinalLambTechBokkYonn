import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';
import { SeatService } from '../service/seat.service';
import { ISeat } from '../seat.model';
import { SeatFormService } from './seat-form.service';

import { SeatUpdateComponent } from './seat-update.component';

describe('Seat Management Update Component', () => {
  let comp: SeatUpdateComponent;
  let fixture: ComponentFixture<SeatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let seatFormService: SeatFormService;
  let seatService: SeatService;
  let carService: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SeatUpdateComponent],
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
      .overrideTemplate(SeatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SeatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    seatFormService = TestBed.inject(SeatFormService);
    seatService = TestBed.inject(SeatService);
    carService = TestBed.inject(CarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Car query and add missing value', () => {
      const seat: ISeat = { id: 456 };
      const car: ICar = { id: 32285 };
      seat.car = car;

      const carCollection: ICar[] = [{ id: 20562 }];
      jest.spyOn(carService, 'query').mockReturnValue(of(new HttpResponse({ body: carCollection })));
      const additionalCars = [car];
      const expectedCollection: ICar[] = [...additionalCars, ...carCollection];
      jest.spyOn(carService, 'addCarToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ seat });
      comp.ngOnInit();

      expect(carService.query).toHaveBeenCalled();
      expect(carService.addCarToCollectionIfMissing).toHaveBeenCalledWith(carCollection, ...additionalCars.map(expect.objectContaining));
      expect(comp.carsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const seat: ISeat = { id: 456 };
      const car: ICar = { id: 16221 };
      seat.car = car;

      activatedRoute.data = of({ seat });
      comp.ngOnInit();

      expect(comp.carsSharedCollection).toContain(car);
      expect(comp.seat).toEqual(seat);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeat>>();
      const seat = { id: 123 };
      jest.spyOn(seatFormService, 'getSeat').mockReturnValue(seat);
      jest.spyOn(seatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seat }));
      saveSubject.complete();

      // THEN
      expect(seatFormService.getSeat).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(seatService.update).toHaveBeenCalledWith(expect.objectContaining(seat));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeat>>();
      const seat = { id: 123 };
      jest.spyOn(seatFormService, 'getSeat').mockReturnValue({ id: null });
      jest.spyOn(seatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seat: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: seat }));
      saveSubject.complete();

      // THEN
      expect(seatFormService.getSeat).toHaveBeenCalled();
      expect(seatService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeat>>();
      const seat = { id: 123 };
      jest.spyOn(seatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ seat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(seatService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCar', () => {
      it('Should forward to carService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(carService, 'compareCar');
        comp.compareCar(entity, entity2);
        expect(carService.compareCar).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
