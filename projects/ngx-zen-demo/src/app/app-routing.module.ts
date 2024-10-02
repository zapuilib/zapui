import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalLayoutComponent } from './layout/internal-layout/internal-layout.component';
import { ButtonComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: InternalLayoutComponent,
    children: [
      {
        path: 'button',
        component: ButtonComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
