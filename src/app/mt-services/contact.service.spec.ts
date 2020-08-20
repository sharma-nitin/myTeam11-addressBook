import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });

  it('should call getContacts', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service.getContacts).toBeDefined();
  });

  it('should call setIndexToBeEdited', () => {
    const service: ContactService = TestBed.get(ContactService);
    const index=2;
    service.setIndexToBeEdited(index)
    expect(service.setIndexToBeEdited).toBeDefined();
  });

  it('should call getIndexToBeEdited', () => {
    const service: ContactService = TestBed.get(ContactService);
    service.getIndexToBeEdited()
    expect(service.getIndexToBeEdited).toBeDefined();
  });

  it('should call deleteContact', () => {
    const service: ContactService = TestBed.get(ContactService);
    const contacts= []
    service.deleteContact(contacts)
    expect(service.deleteContact).toBeDefined();
  });

  it('should call update', () => {
    const service: ContactService = TestBed.get(ContactService);
    const contacts= []
    service.update(contacts)
    expect(service.deleteContact).toBeDefined();
  });
});
