import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayContactsComponent } from './display-contacts/display-contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'display-contacts', component: DisplayContactsComponent},
  {path: '', component: DisplayContactsComponent},
  {path: 'add-contact', component: AddContactComponent},
  {path: 'update-contact', component: UpdateContactComponent},
  {path: 'delete-contact', component: DeleteContactComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
