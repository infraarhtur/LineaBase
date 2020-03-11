
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// complementos
import { HomeComponent } from './components/home/home.component';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import(`./modules/login-jwt/login-jwt.module`).then(m => m.LoginJwtModule) },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard, ], canActivateChild: [LoginGuard, ], },
  { path: '**', component: HomeComponent, canActivate: [LoginGuard, ], canActivateChild: [LoginGuard, ], }


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
