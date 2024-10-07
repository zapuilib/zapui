import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';
import {
  AlertComponent,
  ButtonComponent,
  GettingStartedComponent,
  InputComponent,
  ModalComponent,
  TextareaComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'getting-started',
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        component: GettingStartedComponent,
        pathMatch: 'full',
      },
      {
        path: 'alert',
        component: AlertComponent,
        pathMatch: 'full',
      },
      {
        path: 'button',
        component: ButtonComponent,
        pathMatch: 'full',
      },
      {
        path: 'input',
        component: InputComponent,
        pathMatch: 'full',
      },
      {
        path: 'modal',
        component: ModalComponent,
        pathMatch: 'full',
      },
      {
        path: 'textarea',
        component: TextareaComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'getting-started',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
