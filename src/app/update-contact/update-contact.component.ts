import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  @ViewChild(AddContactComponent) addContact: AddContactComponent | undefined;

  constructor(private fb:FormBuilder, 
    private contactService: ContactsService,
    private matSnackbar: MatSnackBar) { }
  hideAddForm: boolean = true;
  updation: boolean = true;
  contact: Contact | undefined;
  index:number = -1;

  updateForm = this.fb.group({
    phone: ['', [Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(10),
      Validators.pattern("^[0-9]*$")]
    ]
  })

  ngOnInit(): void {
  }

  findContact() {
    const phone = this.updateForm.get('phone')?.value;
    if(this.index != -1) {
      this.hideAddForm = true;
      this.index = -1;
    }
    this.contactService.contacts.forEach((contact,i) => {
      if (contact.phone == phone) {
        this.index = i;
        this.contact = contact;
        return;
      }
    });
    if (this.index != -1) {
      this.hideAddForm = false;
      this.updation = true;
      this.addContact?.addForm.get('firstName')?.setValue(this.contact?.firstName);
      this.addContact?.addForm.get('lastName')?.setValue(this.contact?.lastName);
      this.addContact?.addForm.get('phone')?.setValue(this.contact?.phone);
      this.addContact?.addForm.get('phone')?.disable();
      this.addContact?.addForm.get('gender')?.setValue(this.contact?.isMale);
      this.addContact?.addForm.get('address')?.setValue(this.contact?.address);
    }
    else {
      this.matSnackbar.open('Contact not found', 'OK', {duration: 2000});
    }
  }

  updateContact() {

    this.contact = {
      firstName: this.addContact?.addForm.get('firstName')?.value,
      lastName: this.addContact?.addForm.get('lastName')?.value,
      phone: this.addContact?.addForm.get('phone')?.value,
      isMale: this.addContact?.addForm.get('gender')?.value,
      address: this.addContact?.addForm.get('address')?.value
    }

    this.contactService.contacts[this.index] = this.contact;
    this.hideAddForm = true;
    this.updation = true;
      this.contactService.updateContact(this.contact).subscribe({
        next: (data) => {
          if (data) {
            this.matSnackbar.open(data.toString(), 'OK', {duration: 2000});
          }
          else {
            this.matSnackbar.open('Contact Updated','OK',{duration: 2000});
          }
        },
        error: () => {
          this.matSnackbar.open('Database error', 'OK', {duration: 2000});
        }
      });
  }
}
