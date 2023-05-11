import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RedirectGuard } from '@guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [RedirectGuard]
  },
  {
    path: 'app', //este guardian se ejecuta solo cuando carga la ruta general 'app' por lo que solo sucede la primera vez q accedemos, entonces necesitamos adjuntar el guardian al
    // resto de rutas para que asi se ejecute cada vez q nos movemos entre rutas y desloguee si el token vence
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
