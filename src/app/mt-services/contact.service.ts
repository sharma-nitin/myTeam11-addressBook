import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactIndex: string;

  /**
   * Contacts mock data can be later fetched from api
   */
  contacts = [{
    id:'8448174434',
    firstName: 'Nitin',
    lastName: 'Sharma',
    email: 'sharmanitin1492@gmail.com',
    phoneno: '8448174434',
    country: 'India',
    state:'Pune'
  }, {
    id:'9765436789',
    firstName: 'John',
    lastName: 'Doe',
    email: 'John@gmail.com',
    phoneno: '9765436789',
    country: 'India',
    state:'Pune'
  }, {
    id:'8498766785',
    firstName: 'Smith',
    lastName: 'jones',
    email: 'Smith@gmail.com',
    phoneno: '8498766785',
    country: 'India',
    state:'Pune'

  }, {
    id:'7443487698',
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'Tony@gmail.com',
    phoneno: '7443487698',
    country: 'India',
    state:'Pune'

  }, {
    id:'9844987443',
    firstName: 'Seb',
    lastName: 'palardi',
    email: 'spalardi@gmail.com',
    phoneno: '9844987443',
    country: 'India',
    state:'Pune'

  }, {
    id:'8987675434',
    firstName: 'Ray',
    lastName: 'hudson',
    email: 'hudson@gmail.com',
    phoneno: '8987675434',
    country: 'India',
    state:'Pune'
  }];

  constructor(private http: HttpClient) { }

  /**
   * Gets contacts
   * @returns contacts
   */
  getContacts() {
    return this.contacts;
  }

  getCountries(){
   return this.http.get('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/6ee538beca8914133259b401ba47a550313e8984/countries.min.json')
  }

  /**
   * Sets index to be edited
   * @param index -index to be edited
   */
  setIdToBeEdited(index) {
    this.contactIndex = index;
  }

  /**
   * Gets index to be edited
   * @returns index to be edited
   */
  getIdToBeEdited() {
    return this.contactIndex;
  }

  /**
   * Deletes contact and pdate contacts
   * @param updatedContacts - list of updated contacts
   */
  deleteContact(updatedContacts) {
    this.contacts = [...updatedContacts];
  }

  /**
   * Updates contacts with newly added/updated
   * @param updatedContacts - list of updated contacts
   */
  update(updatedContacts) {
    this.contacts = [...updatedContacts];
  }
}
