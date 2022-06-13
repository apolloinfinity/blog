import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';

// This should be top level routee that only need to be routed to once.
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/users.module').then((m) => m.UsersModule),
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
