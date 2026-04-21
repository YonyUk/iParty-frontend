import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import {
  Email,
  IUserCriteria,
  IUserRepository,
  Password,
  RegisterUserDataDTO,
  User,
  UserAlreadyExistsError,
  UserName,
  UserNotFoundError,
} from 'users-domain';
import { RegisterUserResponseDTO } from 'users-application';
import {
  API_HOST_TOKEN,
  IProblemDetailsDTO,
  IValidationProblemDetailsDTO,
  ProblemDetailsError,
  ValidationProblemDetailsError,
} from 'common';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly apiHost = inject(API_HOST_TOKEN);
  private readonly baseUrl = `${this.apiHost}/users`;

  constructor(private readonly httpClient: HttpClient) {}

  async login(username: UserName, password: Password): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('username', username.Value);
      formData.append('password', password.Value);

      await firstValueFrom(
        this.httpClient.post(`${this.baseUrl}/login`, formData, {
          withCredentials: true,
        }),
      );
      return true;
    } catch (error) {
      if ((error as HttpErrorResponse).status === 401) return false;
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async me(): Promise<User> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<User>(`${this.baseUrl}/me`, {
          withCredentials: true,
        }),
      );
      return response;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async logout(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpClient.delete(`${this.baseUrl}/logout`, {
          withCredentials: true,
        }),
      );
      return true;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  private ThrowError(errorResponse: HttpErrorResponse): Error {
    switch (errorResponse.status) {
      case 409:
        const conflictError = errorResponse.error as IProblemDetailsDTO;
        throw new UserAlreadyExistsError(conflictError.detail);

      case 400:
        const validationError = errorResponse.error as IValidationProblemDetailsDTO;
        throw new ValidationProblemDetailsError(validationError);

      case 404:
        const notFoundError = errorResponse.error as IProblemDetailsDTO;
        throw new UserNotFoundError(notFoundError.detail);

      default:
        throw errorResponse;
    }
  }

  async register(data: RegisterUserDataDTO): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('username', data.username.Value);
      formData.append('email', data.email.Value);
      formData.append('password', data.password.Value);
      formData.append('role', data.role);

      const response = await firstValueFrom(
        this.httpClient.post<RegisterUserResponseDTO>(`${this.baseUrl}/register`, formData),
      );
      return response.id;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async changePassword(password: Password): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('password', password.Value);
      await firstValueFrom(
        this.httpClient.post(`${this.baseUrl}/me/change_password`, formData, {
          withCredentials: true,
        }),
      );
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async getById(id: string): Promise<User> {
    try {
      const response = await firstValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${id}`));
      return response;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async getByName(username: UserName): Promise<User> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<User>(`${this.baseUrl}/name/${username.Value}`),
      );
      return response;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async getByEmail(email: Email): Promise<User> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<User>(`${this.baseUrl}/email/${email.Value}`),
      );
      return response;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async getUsers(criteria: IUserCriteria): Promise<User[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<User[]>(this.baseUrl, {
          params: {
            page: criteria.page,
            role: criteria.role,
          },
        }),
      );
      return response;
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }

  async delete(): Promise<void> {
    try {
      await firstValueFrom(
        this.httpClient.delete(`${this.baseUrl}/me`, {
          withCredentials: true,
        }),
      );
    } catch (error) {
      throw this.ThrowError(error as HttpErrorResponse);
    }
  }
}
