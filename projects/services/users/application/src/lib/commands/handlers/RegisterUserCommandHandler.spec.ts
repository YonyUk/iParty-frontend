import { RegisterUserCommandHandler } from './RegisterUserCommandHandler';
import { RegisterUserCommand } from './../RegisterUserCommand';
import { ICommandValidator, ValidationError } from 'common';
import { IUserRepository, IUsersDomainRulesConfigProvider, PasswordDomainRules, UserAlreadyExistsError, UserNameDomainRules, UserRole } from 'users-domain';
import { mock } from 'vitest-mock-extended';

enum ExpectedResult{
  Ok,
  UsernameError,
  PasswordError,
  EmailError,
  UPError, // UserName and Password error
  UEError, // UserName and Email error
  PEError, // Password and Email error
  UPEError, // UserName, Password and Email error
  UserExistsError
}

describe("RegisterUserCommandHandler test",() => {

  const usernameRules = new UserNameDomainRules(6,10);
  const passwordRules = new PasswordDomainRules(6,10);

  const rules:IUsersDomainRulesConfigProvider = {
    UserNameDomainRules:usernameRules,
    PasswordDomainRules:passwordRules
  };

  const mockedValidator = mock<ICommandValidator<RegisterUserCommand>>();
  const mockedRepository = mock<IUserRepository>();

  beforeEach(() => vi.resetAllMocks());

  it.each([
    ["yonyuk","qwerty1234","test@example.com",ExpectedResult.Ok],
    ["yony","qwerty1234","test@example.com",ExpectedResult.UsernameError],
    ["yonyyonyyony","qwerty1234","test@example.com",ExpectedResult.UsernameError],
    ["yonyuk","qwert","test@example.com",ExpectedResult.PasswordError],
    ["yonyuk","qwertqwertqwert","test@example.com",ExpectedResult.PasswordError],
    ["yonyuk","qwerty1234","testexample.com",ExpectedResult.EmailError],
    ["yony","qwert","testexample.com",ExpectedResult.UPError],
    ["yonyyonyyony","qwert","testexample.com",ExpectedResult.UPError],
    ["yony","qwertqwertqwert","testexample.com",ExpectedResult.UPError],
    ["yonyyonyyony","qwertqwertqwert","testexample.com",ExpectedResult.UPError],
    ["yony","qwerty1234","testexample.com",ExpectedResult.UEError],
    ["yonyyonyyony","qwerty1234","testexample.com",ExpectedResult.UEError],
    ["yonyuk","qwert","testexample.com",ExpectedResult.PEError],
    ["yonyuk","qwertqwertqwert","testexample.com",ExpectedResult.PEError],
    ["yony","qwertqwertqwert","testexample.com",ExpectedResult.UPEError],
    ["yonyyonyyony","qwertqwertqwert","testexample.com",ExpectedResult.UPEError],
    ["yony","qwert","testexample.com",ExpectedResult.UPEError],
    ["yony","qwertqwertqwert","testexample.com",ExpectedResult.UPEError],
    ["yonyyonyyony","qwertqwertqwert","testexample.com",ExpectedResult.UPEError],
    ["yonyuk","qwerty1234","test@example.com",ExpectedResult.UserExistsError],
  ])("should handle RegisterUserCommand", async (
    username:string,
    password:string,
    email:string,
    expected:ExpectedResult
  ) => {

    if (expected === ExpectedResult.Ok){
      mockedRepository.register.mockResolvedValue("id");
    }

    if (expected === ExpectedResult.UsernameError ||
      expected === ExpectedResult.PasswordError ||
      expected === ExpectedResult.EmailError ||
      expected === ExpectedResult.UPError ||
      expected === ExpectedResult.UEError ||
      expected === ExpectedResult.PEError ||
      expected === ExpectedResult.UPEError
    ){
      mockedValidator.validate.mockThrow(new ValidationError("",[]));
    }

    if (expected === ExpectedResult.UserExistsError){
      mockedRepository.register.mockRejectedValue(new UserAlreadyExistsError("the username already exists"));
    }

    const handler = new RegisterUserCommandHandler(mockedValidator,mockedRepository,rules);
    const command: RegisterUserCommand = {
      data:{
        username,
        password,
        email,
        role:UserRole.User
      }
    };

    const act = async () => await handler.handle(command);

    if (expected === ExpectedResult.Ok){
      await expect(act).not.toThrow();
      expect(mockedValidator.validate).toHaveBeenCalledOnce();
      expect(mockedRepository.register).toHaveBeenCalledOnce();
      const response = await act();
      expect(response.id).toBe('id');
    } else if (expected === ExpectedResult.UserExistsError){

      await expect(act).rejects.toThrow(UserAlreadyExistsError);
      expect(mockedValidator.validate).toHaveBeenCalledOnce();
      await expect(mockedRepository.register).toHaveBeenCalledOnce();
    } else{
      await expect(act).rejects.toThrow(ValidationError);
      expect(mockedValidator.validate).toHaveBeenCalledOnce();
    }
  });

});
