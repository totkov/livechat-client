import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', loadChildren: './features/account/account.module#AccountModule', canActivate: [AuthGuard]},
  { path: 'chat', loadChildren: './features/chat/chat.module#ChatModule', canActivate: [AuthGuard]},
  { path: 'authentication', loadChildren: './features/authentication/authentication.module#AuthenticationModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
