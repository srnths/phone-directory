import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../contact';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private contactService: ContactsService,
    private matSnackBar: MatSnackBar) { 
      contactService.displayContact().then(()=>{},
      ()=>{matSnackBar.open('Database error', 'OK', {duration: 4000})}) }

  notEmpty: boolean = false;
  dataSource: any;
  index: number = -1;
  contact!: Contact;

  deleteForm = this.fb.group({
    phone: ['', [Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(10),
      Validators.pattern("^[0-9]*$")]
      ]
  })

  ngOnInit(): void {
  }

  findContact() {
    const phone = this.deleteForm.get('phone')?.value;
    if (this.index != -1) {
      this.dataSource = null;
      this.index = -1;
      this.notEmpty = false;
    }
    this.contactService.contacts.forEach((contact, i) =>{
      if(contact.phone == phone){
        this.dataSource = [contact];
        this.index = i;
        this.contact = contact;
      }});
    if (this.dataSource) {
      this.notEmpty = true;
    }
    else {
      this.matSnackBar.open('Contact not found', 'OK', {duration: 2000});
    }
  }

  deleteContact() {
    this.contactService.deleteContact(this.contact?.phone).subscribe({
      next: () => {
        this.contactService.contacts.splice(this.index, 1);
        this.notEmpty = false;
        this.dataSource = null;
        this.matSnackBar.open('Contact deleted', 'OK', {duration: 2000});
      },
      error: () => {
        this.matSnackBar.open('Network Error', 'OK', {duration: 2000});
      }
    });
  }

}
