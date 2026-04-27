import { USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN } from './../../tokens';
import { UserRepository } from './../../repositories/UserRepository';
import { TestBed } from "@angular/core/testing"
import { provideIUserRepository } from './users-repository-provider';
import { USER_REPOSITORY_TOKEN } from "../../tokens";
import { mock } from 'vitest-mock-extended';
import { IHttpErrorMapper } from '../../services/HttpErrorMapper/IHttpErrorMapper';

describe("provideIUserRepository tests",() => {

  const mockedHttpErrorMapper = mock<IHttpErrorMapper>();

  TestBed.configureTestingModule({
    providers:[
      {
        provide: USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN,
        useValue:mockedHttpErrorMapper
      },
      provideIUserRepository()
    ]
  });

  it("should provide a valid IUserRepository instance",() => {
    const handler = TestBed.inject(USER_REPOSITORY_TOKEN);
    expect(handler).toBeInstanceOf(UserRepository);
  });

});
