import { HttpErrorResponse } from "@angular/common/http";

/**
 * Object to map from HttpErrorResponse to specific errors
 */
export interface IHttpErrorMapper{

  /**
   *
   * @param error error to map
   * @returns the mapped error
   */
  map(error:HttpErrorResponse):Error;

  /**
   * all the status codes error mapped
   */
  get StatusCodesMapped():number[];

  /**
   *
   * @param statusCode status code error that the mapper will map
   * @param mapper factory to build the error
   */
  addMapping(statusCode:number,mapper:(error:HttpErrorResponse) => Error):void;
}
