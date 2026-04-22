import { UserName } from './UserName';
import { UserNameDomainRules } from './../rules/UserNameDomainRules';
import { InvalidUserNameError } from '../errors/InvalidUserNameError';

describe('UserName value object',() => {

  const rules = new UserNameDomainRules(6,10);

  it.each([
    ['yonyuk',true],
    ['yony',false],
    ['',false],
    ['  ',false],
    [undefined,false]
  ])('should handle username %s (valid: %s)',(usernameValue,valid) => {
    const act = () => new UserName(usernameValue!,rules);

    if(valid){
      expect(act).not.toThrow();
      const username = act();
      expect(username.Value).toBe(usernameValue);
    } else{
      expect(act).toThrow(InvalidUserNameError);
    }
  });

});
