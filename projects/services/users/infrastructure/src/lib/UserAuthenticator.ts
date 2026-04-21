import { firstValueFrom } from 'rxjs';
import {
  API_HOST_TOKEN,
  IProblemDetailsDTO,
  IValidationProblemDetailsDTO,
  ValidationProblemDetailsError,
} from 'common';
import { inject, Injectable } from '@angular/core';
import { IUserAuthenticator, Password, UserName, UserNotFoundError } from 'users-domain';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserAuthenticator implements IUserAuthenticator {
  private readonly apiHost = inject(API_HOST_TOKEN);
  private readonly baseUrl = `${this.apiHost}/users`;

  constructor(private readonly httpClient: HttpClient) {}

  private throwError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        const validationError = error.error as IValidationProblemDetailsDTO;
        throw new ValidationProblemDetailsError(validationError);

      case 404:
        const notFoundError = error.error as IProblemDetailsDTO;
        throw new UserNotFoundError(notFoundError.detail);

      default:
        throw error;
    }
  }

  async authenticate(username: UserName, password: Password): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('username', username.Value);
      formData.append('password', password.Value);

      const response = await firstValueFrom(
        this.httpClient.post(`${this.baseUrl}/login`, formData),
      );
      return true;
    } catch (error) {
      if ((error as HttpErrorResponse).status === 401) return false;
      throw this.throwError(error as HttpErrorResponse);
    }
  }
}
