import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../mt-services/contact.service';
import { iContact } from '../mt-interface/contact.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mt-contact-list',
  templateUrl: './mt-contact-list.component.html',
  styleUrls: ['./mt-contact-list.component.scss']
})
export class mtContactListComponent implements OnInit {
  contacts: iContact[];
  modalRef: BsModalRef;
  contacttoDelete: iContact;
  indexToDelete: string;
  asc = true;
  prevSortedBy = null;
  constructor(private router: Router,
    private contactService: ContactService,
    private modalService: BsModalService) { }

  /**
   * on init call to fetch contacts from api
   */
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  /**
   * Navigates mt-contact-form component
   * @param status - add/edit
   * @param [index] - index of contact
   */
  navigate(status, id?) {
    if (status === 'add') {
      this.router.navigate(['add-contact']);
    } else
      if (status === 'edit') {
        this.contactService.setIdToBeEdited(id);
        this.router.navigate(['edit-contact/']);
      }
  }

  /**
   * Delete modal popup to confirm deletion
   * @param index - index of contact
   * @param contact - contact to delete
   * @param template - templeteref of modal
   */
  deleteModal(contact, template,) {
    this.indexToDelete = contact.id;
    this.contacttoDelete = contact;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Delete a contact and update the list
   */
  delete() {
    const contacts = this.contacts.filter((contact) => {
      return contact.id !== this.indexToDelete;
    });
    this.contacts = [...contacts];
    // this.contacts.splice(this.indexToDelete, 1);
    this.contactService.deleteContact(this.contacts);
    this.modalRef.hide();
  }

  sortBy(value) {
    if (this.prevSortedBy === value) {
      this.asc = !this.asc;
    } else {
      this.asc = true;
    }
    this.prevSortedBy = value;
    this.sortByField(value);
  }

  sortByField(value) {
    if (this.asc) {
      this.contacts.sort(function (a, b) {
        var nameA = a[value].toLowerCase();
        var nameB = b[value].toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0;
      })
    } else{
      this.contacts.sort(function (a, b) {
        var nameA = a[value].toLowerCase();
        var nameB = b[value].toLowerCase()
        if (nameA < nameB)
          return 1
        if (nameA > nameB)
          return -1
        return 0;
      })
    }
  }
}
