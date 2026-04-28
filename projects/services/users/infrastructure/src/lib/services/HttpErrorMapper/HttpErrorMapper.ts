import { HttpErrorResponse } from '@angular/common/http';
import { IHttpErrorMapper } from './IHttpErrorMapper';

export class HttpErrorMapper implements IHttpErrorMapper {
  private mappers: Record<number, (error: HttpErrorResponse) => Error> = {};
  private statusCodes: number[] = [];

  map(error: HttpErrorResponse): Error {
    return this.mappers[error.status](error);
  }

  get StatusCodesMapped(): number[] {
    return this.statusCodes;
  }

  addMapping(statusCode: number, mapper: (error: HttpErrorResponse) => Error): void {
    if (!this.statusCodes.includes(statusCode)) this.statusCodes.push(statusCode);
    this.mappers[statusCode] = mapper;
  }
}
