import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    UserNotFoundError
} from "users-domain";
import {
    RegisterUserResponseDTO
} from "users-application";
import { ProblemDetailsError, ValidationProblemDetailsError } from "common";

@Injectable()
export class UserRepository implements IUserRepository {

    private readonly baseUrl = '/users';

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    private ThrowError(errorResponse: HttpErrorResponse): Error {
        switch (errorResponse.status) {
            case 409:
                const conflictError = errorResponse.error as ProblemDetailsError;
                throw new UserAlreadyExistsError(conflictError.Detail);

            case 400:
                throw errorResponse.error as ValidationProblemDetailsError;

            case 404:
                const notFoundError = errorResponse.error as ProblemDetailsError;
                throw new UserNotFoundError(notFoundError.Detail);

            default:
                throw errorResponse;
        }
    }

    async register(data: RegisterUserDataDTO): Promise<string> {

        try {
            const formData = new FormData();
            formData.append("username", data.username.Value);
            formData.append("email", data.email.Value);
            formData.append("password", data.password.Value);
            formData.append("role", data.role);

            const response = await firstValueFrom(
                this.httpClient.post<RegisterUserResponseDTO>('/register', formData)
            );
            return response.id;
        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async changePassword(password: Password): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("password", password.Value);
            await firstValueFrom(this.httpClient.post("/me/change_password", formData));

        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async getById(id: string): Promise<User> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<User>(`/${id}`)
            );
            return response;
        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async getByName(username: UserName): Promise<User> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<User>(`/name/${username.Value}`)
            );
            return response;
        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async getByEmail(email: Email): Promise<User> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<User>(`/email/${email.Value}`)
            );
            return response;
        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async getUsers(criteria: IUserCriteria): Promise<User[]> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<User[]>('',{
                    params:{
                        page:criteria.page,
                        role:criteria.role
                    }
                })
            )
            return response;
        } catch (error) {
            throw this.ThrowError(error as HttpErrorResponse);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await firstValueFrom(
                this.httpClient.delete(`/${id}`)
            );
        } catch (error) {
            
        }
    }

}