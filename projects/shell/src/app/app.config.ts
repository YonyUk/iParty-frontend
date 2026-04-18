import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideUsersInfrastructure } from 'users-infrastructure';
import { API_HOST_TOKEN } from 'common';
import { environment } from '../environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(),
		provideUsersInfrastructure(),
		{
			provide: API_HOST_TOKEN,
			useValue: environment.apiHost
		}
	],
};
