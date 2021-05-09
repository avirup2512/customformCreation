import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialougeComponent } from './confirmation-dialouge.component';

describe('ConfirmationDialougeComponent', () => {
  let component: ConfirmationDialougeComponent;
  let fixture: ComponentFixture<ConfirmationDialougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialougeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
