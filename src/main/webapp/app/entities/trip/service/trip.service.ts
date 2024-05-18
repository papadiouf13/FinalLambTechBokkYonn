import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrip, NewTrip } from '../trip.model';

export type PartialUpdateTrip = Partial<ITrip> & Pick<ITrip, 'id'>;

export type EntityResponseType = HttpResponse<ITrip>;
export type EntityArrayResponseType = HttpResponse<ITrip[]>;

@Injectable({ providedIn: 'root' })
export class TripService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trips');

  create(trip: NewTrip): Observable<EntityResponseType> {
    return this.http.post<ITrip>(this.resourceUrl, trip, { observe: 'response' });
  }

  update(trip: ITrip): Observable<EntityResponseType> {
    return this.http.put<ITrip>(`${this.resourceUrl}/${this.getTripIdentifier(trip)}`, trip, { observe: 'response' });
  }

  partialUpdate(trip: PartialUpdateTrip): Observable<EntityResponseType> {
    return this.http.patch<ITrip>(`${this.resourceUrl}/${this.getTripIdentifier(trip)}`, trip, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrip>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrip[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTripIdentifier(trip: Pick<ITrip, 'id'>): number {
    return trip.id;
  }

  compareTrip(o1: Pick<ITrip, 'id'> | null, o2: Pick<ITrip, 'id'> | null): boolean {
    return o1 && o2 ? this.getTripIdentifier(o1) === this.getTripIdentifier(o2) : o1 === o2;
  }

  addTripToCollectionIfMissing<Type extends Pick<ITrip, 'id'>>(
    tripCollection: Type[],
    ...tripsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trips: Type[] = tripsToCheck.filter(isPresent);
    if (trips.length > 0) {
      const tripCollectionIdentifiers = tripCollection.map(tripItem => this.getTripIdentifier(tripItem));
      const tripsToAdd = trips.filter(tripItem => {
        const tripIdentifier = this.getTripIdentifier(tripItem);
        if (tripCollectionIdentifiers.includes(tripIdentifier)) {
          return false;
        }
        tripCollectionIdentifiers.push(tripIdentifier);
        return true;
      });
      return [...tripsToAdd, ...tripCollection];
    }
    return tripCollection;
  }
}
