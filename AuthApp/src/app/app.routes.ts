import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { menuGuard } from './guards/menu-guard';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () =>
            import('./views/pages/page-login/page-login').then(m => m.PageLogin)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./views/pages/page-register/page-register').then(m => m.PageRegister)
    },
    {
        path: '',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./views/layouts/main-layout/main-layout').then(m => m.MainLayout),
        children: [
            {
                path: 'home',
                canActivate: [menuGuard],
                loadComponent: () =>
                    import('./views/pages/page-home/page-home').then(m => m.PageHome)
            },
            {
                path: 'admin',
                canActivate: [menuGuard],
                loadComponent: () =>
                    import('./views/pages/page-admin/page-admin').then(m => m.PageAdmin)
            },
            {
                path: 'seller',
                canActivate: [menuGuard],
                loadComponent: () =>
                    import('./views/pages/page-seller/page-seller').then(m => m.PageSeller)
            },
            {
                path: 'notfound',
                loadComponent: () =>
                    import('./views/pages/page-not-found/page-not-found').then(m => m.PageNotFound)
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'notfound',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];
