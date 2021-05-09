import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers/reducers';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { clickOnNext, clickOnPrevious, clickOnSubmit } from '../store/actions/footerButtonAction';

@Component({
  selector: 'app-parent-form-creation',
  templateUrl: './parent-form-creation.component.html',
  styleUrls: ['./parent-form-creation.component.css']
})
export class ParentFormCreationComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  inBasicDetailsPage: boolean = true;
  inEditPage: boolean = false;
  inPreviewPage: boolean = false;

  constructor(private store: Store<AppState>, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: any) => {
        this.inBasicDetailsPage = state.formCreationPage.inBasicDetailsPage;
        this.inEditPage = state.formCreationPage.inEditPage;
        this.inPreviewPage = state.formCreationPage.inPreviewPage;
        this.changeDetection.detectChanges();
      })
  };
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  clickOnNext(event: any) {
    this.store.dispatch(new clickOnNext(true));
  }
  clickPrevious(event: any) {
    this.store.dispatch(new clickOnPrevious(true))
  }

  clickSubmit(event: any) {
    this.store.dispatch(new clickOnSubmit(true))
  }

}
