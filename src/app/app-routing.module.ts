import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';








const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la página de login por defecto
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },


  
  

 

//   {
//     path: '**',
//     loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
//   },
// ##


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}




