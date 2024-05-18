import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SeatComponent } from './list/seat.component';
import { SeatDetailComponent } from './detail/seat-detail.component';
import { SeatUpdateComponent } from './update/seat-update.component';
import SeatResolve from './route/seat-routing-resolve.service';

const seatRoute: Routes = [
  {
    path: '',
    component: SeatComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeatDetailComponent,
    resolve: {
      seat: SeatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeatUpdateComponent,
    resolve: {
      seat: SeatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeatUpdateComponent,
    resolve: {
      seat: SeatResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default seatRoute;
