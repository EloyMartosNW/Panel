import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') , canActivate : [authGuard]},
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') , canActivate : [authGuard]}
        ]
    },
    { path: 'notfound', component: Notfound , canActivate : [authGuard]},
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
