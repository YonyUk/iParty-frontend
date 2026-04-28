import { UserAlreadyExistsError, UserNotFoundError } from 'users-domain';
import { IProblemDetailsDTO, IValidationProblemDetailsDTO, NotAuthorizedError, ValidationProblemDetailsError } from 'common';
import { Provider } from "@angular/core";
import { USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN } from "../../tokens";
import { HttpErrorMapper } from "../../services/HttpErrorMapper/HttpErrorMapper";

export function provideUserRepositoryHttpErrorMapper():Provider{
  return {
    provide:USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN,
    useFactory:() => {

      const mapper = new HttpErrorMapper();

      mapper.addMapping(409,(error) => {
        const conflictError = error.error as IProblemDetailsDTO;
        return new UserAlreadyExistsError(conflictError.detail);
      });

      mapper.addMapping(400,(error) => {
        const validationError = error.error as IValidationProblemDetailsDTO;
        return new ValidationProblemDetailsError(validationError);
      });

      mapper.addMapping(404,(error) => {
        const notFoundError = error.error as IProblemDetailsDTO;
        return new UserNotFoundError(notFoundError.detail);
      });

      mapper.addMapping(401,(error) => {
        return new NotAuthorizedError("User not authenticated");
      });

      return mapper;
    }
  }
}
