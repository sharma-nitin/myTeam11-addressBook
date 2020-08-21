import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../mt-services/contact.service';
import { iContact } from '../mt-interface/contact.interface';
import { Contact } from '../../app/mt-model/contact';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'mt-contact-form',
  templateUrl: './mt-contact-form.component.html',
  styleUrls: ['./mt-contact-form.component.css']
})

export class mtContactFormComponent implements OnInit {
  contacts: iContact[];
  modalRef: BsModalRef;
  activeRoute: string;
  contactModel = new Contact('', '', '', '', 'India', '');
  countryData: any;
  countries = [];
  states = [];
  updated = '';
  userExist = false;
  constructor(private router: Router,
    private modalService: BsModalService,
    private contactService: ContactService,
  ) { }

  /**
   * on init call to fetch contacts from api
   */
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.getCountries().subscribe((res: any) => {
      this.countryData = res;
      this.countries = Object.keys(res);
      this.states = this.countryData['India'];
      this.routeBasedAction();
    });
  }

  onCountrySelect(country) {
    this.states = this.countryData[country];
    this.contactModel.state = '';
  }

  /**
   * Display form conditionally based on route
   * if '/add-contact' then empty form
   * '/edit-contact' then form will be prepopulated with contact details
   */
  routeBasedAction() {
    if (this.router.url === '/add-contact') {
      this.activeRoute = 'add';
    } else
      if (this.router.url === '/edit-contact') {
        this.activeRoute = 'edit';
        const id = this.contactService.getIdToBeEdited();
        const editContact = this.contacts.filter((contact) => {
          return contact.id === id;
        });
        this.states = this.countryData[editContact[0].country];
        this.contactModel = new Contact(
          editContact[0].firstName,
          editContact[0].lastName,
          editContact[0].email,
          editContact[0].phoneno,
          editContact[0].country,
          editContact[0].state,
          editContact[0].id,
        );
      }
  }

  /**
   * Navigates to mt-contact-list component
   * when clicked on Back to Home Button
   */
  navigate() {
    this.router.navigate(['contact-list']);
  }

  /**
   * Updates eisting contact
   * Navigates to Contact List once updated
   */
  updateContact() {
    const contact = {
      firstName: this.contactModel.firstName,
      lastName: this.contactModel.lastName,
      email: this.contactModel.email,
      phoneno: this.contactModel.phoneno,
      country: this.contactModel.country,
      state: this.contactModel.state,
      id: this.contactModel.id,
    };
    const index = this.contacts.findIndex((el) =>
      el.id === contact.id);
    this.contacts[index] = contact;
    this.contactService.update(this.contacts);
    this.updated = 'updated';
    setTimeout(() => {
      this.router.navigate(['contact-list']);
    }, 1000);
  }

  /**
   * Adds contact when a New contact is added
   * Navigate to Contact List once added
   */
  addContact(template) {
    const contact = {
      id: this.contactModel.phoneno,
      firstName: this.contactModel.firstName,
      lastName: this.contactModel.lastName,
      email: this.contactModel.email,
      phoneno: this.contactModel.phoneno,
      country: this.contactModel.country,
      state: this.contactModel.state
    };
    const ExistContact = this.contacts.filter((item) => {
      return item.phoneno === contact.phoneno;
    });

    if (ExistContact[0]) {
     this.modalRef = this.modalService.show(template);
      return;
    }
    const updatedContacts = [...this.contacts, ...[contact]];
    this.contactService.update(updatedContacts);
    this.updated = 'added';
    setTimeout(() => {
      this.router.navigate(['contact-list']);
    }, 1000);
  }
}
