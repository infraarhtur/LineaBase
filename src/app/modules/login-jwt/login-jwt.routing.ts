import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

// components
import { MainComponent } from './components/main/main.component';
import {InComponent } from './components/in/in.component';

const loginJwtRoutes: Routes = [
  {
    path: 'login',
     component: MainComponent,
    
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component:InComponent}

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginJwtRoutes),

  ],
  exports: [
    RouterModule
  ]
})

export class loginJwtRoutingModule { }
