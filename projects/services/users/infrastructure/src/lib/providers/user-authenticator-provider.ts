import { Provider } from '@angular/core';
import { USER_AUTHENTICATOR_TOKEN } from '../tokens';
import { UserAuthenticator } from '../UserAuthenticator';

export function provideUserAuthenticator(): Provider {
  return {
    provide: USER_AUTHENTICATOR_TOKEN,
    useClass: UserAuthenticator,
  };
}
