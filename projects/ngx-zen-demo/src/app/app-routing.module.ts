import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';
import {
  AlertComponent,
  ButtonComponent,
  InputComponent,
  TooltipComponent,
  ChipComponent, 
  GettingStartedComponent,
  CheckboxComponent,
  ModalComponent,
  SelectComponent,
  TextareaComponent,
  DialogComponent,
  ToggleComponent,
  TableComponent,
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
        path: 'dialog',
        component: DialogComponent,
        pathMatch: 'full',
      },
      {
        path: 'input',
        component: InputComponent,
        pathMatch: 'full',
      },
      {
        path: 'tooltip',
        component: TooltipComponent,
        pathMatch: 'full',
      },
      {
        path: 'modal',
        component: ModalComponent,
        pathMatch: 'full',
      },
      {
        path: 'select',
        component: SelectComponent,
        pathMatch: 'full',
      },
      {
        path: 'textarea',
        component: TextareaComponent,
        pathMatch: 'full',
      },
      {
        path: 'checkbox',
        component: CheckboxComponent,
        pathMatch: 'full',
      },
      {
        path: 'toggle',
        component: ToggleComponent,
        pathMatch: 'full',
      },
      {
        path: 'chip',
        component: ChipComponent,
        pathMatch: 'full',
      },
      {
        path: 'table',
        component: TableComponent,
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
