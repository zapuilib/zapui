import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';
import { AlertComponent, ButtonComponent, ChipComponent, GettingStartedComponent } from './components';
import { NotificationDemoComponent } from './components/notification-demo/notification-demo.component';


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
        path: 'chips',
        component: ChipComponent,
        pathMatch: 'full',
      },
      {
        path: 'notification',
        component: NotificationDemoComponent,
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
