import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  contacts: Contact[] = []; 
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  addContact(formData: Contact) {
    return this.http.post('http://localhost:3000/api/add-contact', formData);
  }

  updateContact(formData: Contact) {
    return this.http.post('http://localhost:3000/api/update-contact', formData);
  }

  displayContact() {
    this.http.get<Contact[]>('http://localhost:3000/api/get-contacts').subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: () => {
        this.snackBar.open('Network error', 'OK', {duration: 2000});
      }
    });
  }
}
