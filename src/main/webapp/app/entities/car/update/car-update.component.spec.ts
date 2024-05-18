import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITransporter } from 'app/entities/transporter/transporter.model';
import { TransporterService } from 'app/entities/transporter/service/transporter.service';
import { CarService } from '../service/car.service';
import { ICar } from '../car.model';
import { CarFormService } from './car-form.service';

import { CarUpdateComponent } from './car-update.component';

describe('Car Management Update Component', () => {
  let comp: CarUpdateComponent;
  let fixture: ComponentFixture<CarUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let carFormService: CarFormService;
  let carService: CarService;
  let transporterService: TransporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CarUpdateComponent],
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
      .overrideTemplate(CarUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CarUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    carFormService = TestBed.inject(CarFormService);
    carService = TestBed.inject(CarService);
    transporterService = TestBed.inject(TransporterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Transporter query and add missing value', () => {
      const car: ICar = { id: 456 };
      const transporter: ITransporter = { id: 27697 };
      car.transporter = transporter;

      const transporterCollection: ITransporter[] = [{ id: 24604 }];
      jest.spyOn(transporterService, 'query').mockReturnValue(of(new HttpResponse({ body: transporterCollection })));
      const additionalTransporters = [transporter];
      const expectedCollection: ITransporter[] = [...additionalTransporters, ...transporterCollection];
      jest.spyOn(transporterService, 'addTransporterToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ car });
      comp.ngOnInit();

      expect(transporterService.query).toHaveBeenCalled();
      expect(transporterService.addTransporterToCollectionIfMissing).toHaveBeenCalledWith(
        transporterCollection,
        ...additionalTransporters.map(expect.objectContaining),
      );
      expect(comp.transportersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const car: ICar = { id: 456 };
      const transporter: ITransporter = { id: 29228 };
      car.transporter = transporter;

      activatedRoute.data = of({ car });
      comp.ngOnInit();

      expect(comp.transportersSharedCollection).toContain(transporter);
      expect(comp.car).toEqual(car);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carFormService, 'getCar').mockReturnValue(car);
      jest.spyOn(carService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: car }));
      saveSubject.complete();

      // THEN
      expect(carFormService.getCar).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(carService.update).toHaveBeenCalledWith(expect.objectContaining(car));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carFormService, 'getCar').mockReturnValue({ id: null });
      jest.spyOn(carService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: car }));
      saveSubject.complete();

      // THEN
      expect(carFormService.getCar).toHaveBeenCalled();
      expect(carService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICar>>();
      const car = { id: 123 };
      jest.spyOn(carService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ car });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(carService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
