import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducers';
import { clickOnNext } from '../../store/actions/footerButtonAction';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { onBasicDetailsPage, onEditPage, onPreviwePage } from '../../store/actions/formCreationPageAction';
import { addBasicDetails } from '../../store/actions/basicDetailsAction';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit, OnDestroy {

  basicDetailsForm: FormGroup;
  tagList: Array<any> = [];
  removable: boolean = true;
  selectable: boolean = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTag: Observable<string[]>;
  addOnBlur: boolean = true;



  private ngUnsubscribe = new Subject();


  constructor(private store: Store<AppState>, private router: Router) {
    this.basicDetailsForm = new FormGroup({
      formName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      formType: new FormControl(''),
      searchedTags: new FormControl(''),
    });
    this.filteredTag = new Observable();
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.store.dispatch(new onBasicDetailsPage(true));
    this.store.dispatch(new onEditPage(false));
    this.store.dispatch(new onPreviwePage(false));

    let control = this.basicDetailsForm.get('searchedTags') as FormControl;
    this.filteredTag = control.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.tagList.slice()));

    this.store
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: any) => {
        this.basicDetailsForm.patchValue({
          formName: state.basicDetailsState.formName,
          description: state.basicDetailsState.description
        });
        console.log(state.basicDetailsState.searchKeywords);
        if (state.basicDetailsState.searchKeywords.length > 0) {
          this.tagList = []
          state.basicDetailsState.searchKeywords.forEach((e: any) => {
            this.tagList.push(e)
          })
        }
        if (state.buttonActionState.next) {
          this.basicDetailsForm.markAllAsTouched();
          if (this.basicDetailsForm.valid) {
            this.router.navigate(['create-form/form-edit']);
          }
          this.store.dispatch(new clickOnNext(false));
        }
      })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  removeTag(tag: any) {
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
    this.basicDetailsFormChange();
  }
  addTag(event: any) {
    console.log(event);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let array = [];
      this.tagList.forEach((e: any) => {
        array.push(e)
      })
      array.push(value.trim());
      this.tagList = array;
      console.log(this.tagList);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    let control = this.basicDetailsForm.get('searchedTags') as FormControl
    control.setValue(null);
    this.basicDetailsFormChange()
  }
  selectedTag(tag: any) {

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  };

  basicDetailsFormChange() {
    console.log(this.tagList);
    this.store.dispatch(new addBasicDetails(Object.assign({}, this.basicDetailsForm.value, { searchKeywords: this.tagList })))
  }
}
