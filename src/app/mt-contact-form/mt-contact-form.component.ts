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
  contactModel = new Contact('', '', '', '', '', 'India', '');
  countryData: any;
  countries = [];
  states = [];
  updated = '';
  userExist = false;
  url = './assets/user.png';
  dummyImage = "data:image/png;base64,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";
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
          editContact[0].image,
          editContact[0].firstName,
          editContact[0].lastName,
          editContact[0].email,
          editContact[0].phoneno,
          editContact[0].country,
          editContact[0].state,
          editContact[0].id,
        );
        this.url = editContact[0].image;
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
      image: this.contactModel.image ? this.contactModel.image   : this.dummyImage,
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
      image: this.contactModel.image ? this.contactModel.image   : this.dummyImage,
      id: this.contactModel.phoneno,
      firstName: this.contactModel.firstName,
      lastName: this.contactModel.lastName,
      email: this.contactModel.email,
      phoneno: this.contactModel.phoneno,
      country: this.contactModel.country,
      state: this.contactModel.state,
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.contactModel.image =  this.url;

      }
    }
  }
}
