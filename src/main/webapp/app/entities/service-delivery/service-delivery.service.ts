import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceDelivery } from 'app/shared/model/service-delivery.model';

type EntityResponseType = HttpResponse<IServiceDelivery>;
type EntityArrayResponseType = HttpResponse<IServiceDelivery[]>;

@Injectable({ providedIn: 'root' })
export class ServiceDeliveryService {
  public resourceUrl = SERVER_API_URL + 'api/service-deliveries';

  constructor(protected http: HttpClient) {}

  create(serviceDelivery: IServiceDelivery): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceDelivery);
    return this.http
      .post<IServiceDelivery>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceDelivery: IServiceDelivery): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceDelivery);
    return this.http
      .put<IServiceDelivery>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceDelivery>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceDelivery[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceDelivery: IServiceDelivery): IServiceDelivery {
    const copy: IServiceDelivery = Object.assign({}, serviceDelivery, {
      createdDateTime:
        serviceDelivery.createdDateTime != null && serviceDelivery.createdDateTime.isValid()
          ? serviceDelivery.createdDateTime.toJSON()
          : null,
      modifiedDateTime:
        serviceDelivery.modifiedDateTime != null && serviceDelivery.modifiedDateTime.isValid()
          ? serviceDelivery.modifiedDateTime.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDateTime = res.body.createdDateTime != null ? moment(res.body.createdDateTime) : null;
      res.body.modifiedDateTime = res.body.modifiedDateTime != null ? moment(res.body.modifiedDateTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceDelivery: IServiceDelivery) => {
        serviceDelivery.createdDateTime = serviceDelivery.createdDateTime != null ? moment(serviceDelivery.createdDateTime) : null;
        serviceDelivery.modifiedDateTime = serviceDelivery.modifiedDateTime != null ? moment(serviceDelivery.modifiedDateTime) : null;
      });
    }
    return res;
  }
}
