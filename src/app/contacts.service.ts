import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  contacts: Contact[] = []; 
  constructor(private http: HttpClient) { }

  addContact(formData: Contact) {
     return this.http.post('http://localhost:3000/api/add-contact', formData);
  }
}
