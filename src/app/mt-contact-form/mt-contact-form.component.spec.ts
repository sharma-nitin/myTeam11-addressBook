import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { mtContactFormComponent } from './mt-contact-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { mtContactListComponent } from '../mt-contact-list/mt-contact-list.component';
describe('mtContactFormComponent', () => {
  let component: mtContactFormComponent;
  let fixture: ComponentFixture<mtContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [mtContactFormComponent,mtContactListComponent],
      imports: [FormsModule,
        RouterTestingModule.withRoutes(
          [  { path: 'contact-list', component: mtContactListComponent },
          { path: 'edit-contact', component: mtContactFormComponent }
        ])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mtContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('makes call to routeBasedAction ', () => {
    spyOn(component, 'routeBasedAction').and.callThrough();
    fixture.whenStable().then(() => {
      const router = TestBed.get(Router);
      router.url = '/add-contact';
      component.routeBasedAction();
      expect(component.routeBasedAction()).toHaveBeenCalled();
    });
  });


  it('makes call to routeBasedAction ', () => {
    spyOn(component, 'routeBasedAction').and.callThrough();
    fixture.whenStable().then(() => {
      const router = TestBed.get(Router);
      router.url = '/edit-contact';
      component.routeBasedAction();
      expect(component.routeBasedAction).toHaveBeenCalled();
    });
  });

  it('makes call to navigate ', () => {
    spyOn(component, 'navigate').and.callThrough();
    fixture.whenStable().then(() => {
      component.navigate();
      expect(component.navigate).toHaveBeenCalled();
    });
  });
  it('makes call to addContact ', () => {
    spyOn(component, 'addContact').and.callThrough();
    fixture.whenStable().then(() => {
      component.addContact();
      expect(component.addContact).toHaveBeenCalled();
    });
  });

  it('makes call to updateContact ', () => {
    spyOn(component, 'updateContact').and.callThrough();
    fixture.whenStable().then(() => {
      component.updateContact();
      expect(component.updateContact).toHaveBeenCalled();
    });
  });

});
