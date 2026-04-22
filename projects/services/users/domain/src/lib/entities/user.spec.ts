import { User } from './User';
import { UserRole } from './../enums/UserRole';
import { UserNameDomainRules } from "../rules/UserNameDomainRules"
import { UserName } from '../value-objects/UserName';
import { Email } from '../value-objects/Email';

describe('User entity',() => {
  const usernameRules = new UserNameDomainRules(6,10);

  it.each([
    [UserRole.User],
    [UserRole.Host]
  ])('should handle user entity',(role) => {

    const username = new UserName('yonyuk',usernameRules);
    const email = new Email('test@example.com');
    const id = 'id';

    const user = new User(id,username,email,role);

    expect(user.Email).toBe(email);
    expect(user.Id).toBe(id);
    expect(user.Role).toBe(role);
    expect(user.UserName).toBe(username);

  });

})
