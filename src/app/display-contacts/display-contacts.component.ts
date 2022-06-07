import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-display-contacts',
  templateUrl: './display-contacts.component.html',
  styleUrls: ['./display-contacts.component.css']
})
export class DisplayContactsComponent implements OnInit {

  constructor(private contactService: ContactsService,
    private fb: FormBuilder) { 
      
  }

  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() notEmpty: boolean = false;
  @Input() delete: boolean = false;
  @Input() dataSource = this.contactService.contacts;

  notFound: boolean = false;

  searchForm = this.fb.group({
    search: ['']
  });

  columnsToDisplay = ['First Name', 'Last Name', 'Phone', 'Gender', 'Address'];

  ngOnInit(): void {
    if (this.dataSource.length != 0)
      this.notEmpty = true;
    this.onChanges();
    this.displayContacts();
  }

  onChanges() {
    this.searchForm.get('search')?.valueChanges.subscribe(val =>{
      if (this.contactService.contacts.length != 0){
        this.dataSource = this.contactService.contacts.filter(
          f => f.firstName.toLowerCase().includes(val.toLowerCase())
          );
        if(this.dataSource.length == 0) {
          this.notFound = true;
        }
        else if(this.notFound) {
          this.notFound = false;
        }
      }
    })
  }

  displayContacts() {
  this.contactService.displayContact().then(() => {
    this.dataSource = this.contactService.contacts;
    this.table?.renderRows();
    if(this.contactService.contacts.length != 0) {
      this.notEmpty = true;
    }
  },
  () => {
    console.log('error');
  }); 
  }

}
