import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from './../contact';
import { ContactsService } from './../contacts.service';
import { Output, EventEmitter} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @Input() updation: boolean = false;
  @Output() update = new EventEmitter();

  constructor(private fb: FormBuilder, 
    private contactService: ContactsService,
    private matSnackBar: MatSnackBar) { }

  isMale:boolean = true;

  addForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, 
    Validators.minLength(10), 
    Validators.maxLength(10),
    Validators.pattern("^[0-9]*$")]
    ],
    gender: [true],
    address: ['']
  });
  ngOnInit(): void {
  }

  radio(){
    this.isMale = (this.addForm.get('gender')?.value == 'true');
  }

  onSubmit() {
    const phone = this.addForm.get('phone')?.value;
    const contact:Contact = {
      firstName: this.addForm.get('firstName')?.value,
      lastName: this.addForm.get('lastName')?.value,
      isMale: this.addForm.get('gender')?.value,
      phone: phone,
      address: this.addForm.get('address')?.value
    }

    let c = this.contactService.contacts.find(c => c.phone == phone);

    if(c && !this.updation) {
      this.matSnackBar.open('Number already present', 'OK',{duration:2000});
    }
    else {
      this.update.emit();
      if(!this.updation){
        this.contactService.contacts.push(contact);
        this.matSnackBar.open('Contact added', 'OK',{duration:2000});
        
        this.addForm.reset();
        this.addForm.get('firstName')?.clearValidators();
        this.addForm.get('firstName')?.updateValueAndValidity();
        this.addForm.get('lastName')?.clearValidators();
        this.addForm.get('lastName')?.updateValueAndValidity();
        this.addForm.get('gender')?.clearValidators();
        this.addForm.get('gender')?.updateValueAndValidity();
        this.addForm.get('phone')?.clearValidators();
        this.addForm.get('phone')?.updateValueAndValidity();
        this.addForm.get('address')?.clearValidators();
        this.addForm.get('address')?.updateValueAndValidity();
       
      }
    }
  }


}
