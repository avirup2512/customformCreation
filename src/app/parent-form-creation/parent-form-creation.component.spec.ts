import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentFormCreationComponent } from './parent-form-creation.component';

describe('ParentFormCreationComponent', () => {
  let component: ParentFormCreationComponent;
  let fixture: ComponentFixture<ParentFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentFormCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
