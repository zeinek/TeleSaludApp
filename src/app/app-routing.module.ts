import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.guard';  // Asegúrate de importar el guard

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule),
  },
  {
    path: 'correo',
    loadChildren: () => import('./home/correo/correo.module').then(m => m.CorreoPageModule),
    canActivate: [AuthGuard],  // Protegiendo la ruta
  },
  {
    path: 'citas',
    loadChildren: () => import('./citas/citas.module').then(m => m.CitasPageModule),
    canActivate: [AuthGuard],  // Protegiendo la ruta
  },

  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    canActivate: [AuthGuard], // Protegiendo la ruta
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard], // Protegiendo la ruta
  },

    //{
    //path: 'agendarcita',
    //loadChildren: () => import('./home/agendarcita/agendarcita.module').then(m => m.AgendarcitaPageModule),
    //canActivate: [AuthGuard],  // Protegiendo la ruta
  //},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
