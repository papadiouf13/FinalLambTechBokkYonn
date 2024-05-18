import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISeat } from '../seat.model';
import { SeatService } from '../service/seat.service';

const seatResolve = (route: ActivatedRouteSnapshot): Observable<null | ISeat> => {
  const id = route.params['id'];
  if (id) {
    return inject(SeatService)
      .find(id)
      .pipe(
        mergeMap((seat: HttpResponse<ISeat>) => {
          if (seat.body) {
            return of(seat.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default seatResolve;
