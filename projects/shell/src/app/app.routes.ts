import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch:'full'
    },
    {
        path:'users',
        loadChildren:() => import('users-ui').then(m => m.USERS_ROUTES)
    },
    {
        path:'**',
        pathMatch:'full',
        redirectTo:'/users'
    }
];
