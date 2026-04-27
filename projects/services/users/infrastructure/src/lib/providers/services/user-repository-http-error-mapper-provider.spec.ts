import { TestBed } from "@angular/core/testing"
import { provideUserRepositoryHttpErrorMapper } from './user-repository-http-error-mapper-provider';
import { USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN } from "../../tokens";
import { HttpErrorMapper } from "../../services/HttpErrorMapper/HttpErrorMapper";

describe("provideUserRepositoryHttpErrorMapper tests",() => {

  TestBed.configureTestingModule({
    providers:[
      provideUserRepositoryHttpErrorMapper()
    ]
  });

  it("should provide a valid IHttpErrorMapper",() => {
    const mapper = TestBed.inject(USER_REPOSITORY_HTTP_ERROR_MAPPER_TOKEN);
    expect(mapper).toBeInstanceOf(HttpErrorMapper);
  });
});
