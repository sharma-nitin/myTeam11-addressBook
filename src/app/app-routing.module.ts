import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mtContactListComponent } from './mt-contact-list/mt-contact-list.component';
import { mtContactFormComponent } from './mt-contact-form/mt-contact-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
  { path: 'contact-list', component: mtContactListComponent },
  { path: 'add-contact', component: mtContactFormComponent },
  { path: 'edit-contact', component: mtContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
