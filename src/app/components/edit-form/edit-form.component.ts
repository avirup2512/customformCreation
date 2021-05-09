import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducers';
import { clickOnPrevious, clickOnSubmit } from '../../store/actions/footerButtonAction';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { onBasicDetailsPage, onEditPage, onPreviwePage } from '../../store/actions/formCreationPageAction';
import { addEntity, addGroup, copyEntity, editEntity, editGroupName, moveEntity, removeEntity, removeGroup, touchedEntity } from '../../store/actions/formEntityAction';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  formEntityList: Array<any> = [];
  currentFormEntityList: Array<any> = [];

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new onBasicDetailsPage(false));
    this.store.dispatch(new onEditPage(true));
    this.store.dispatch(new onPreviwePage(false));

    this.store
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: any) => {
        if (this.formEntityList.length == 0) {
          for (const key in state.formEntityState.formEntityList) {
            if (Object.prototype.hasOwnProperty.call(state.formEntityState.formEntityList, key)) {
              this.formEntityList.push(state.formEntityState.formEntityList[key]);
            }
          }
        };
        this.currentFormEntityList = [];
        state.formEntityState.currentFormentityList.forEach((e: any) => {
          this.currentFormEntityList.push(e)
        });
        if (state.buttonActionState.previous) {
          this.router.navigate(['create-form/basic-details']);
          this.store.dispatch(new clickOnPrevious(false));
        };
      })
  };
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };
  addEntity(event: any) {
    this.store.dispatch(new addEntity(event))
  }
  addGroup(event: any) {
    let group: any = {
      groupName: "Group 1",
      group: []
    }
    this.store.dispatch(new addGroup(group))
  }
  editGroupName(value: any) {
    this.store.dispatch(new editGroupName({ groupIndex: value.groupIndex, groupName: value.groupName }))
  }
  deleteGroup(value: any) {
    this.store.dispatch(new removeGroup(value.index))
  }
  deleteEntity(event: any) {
    this.store.dispatch(new removeEntity(event));
  }
  dropEntity(event: any) {
    if (!(event.dragStartGroupIndex == event.dropGroupIndex && event.entityCurrentIndex == event.entityPreviousIndex)) {
      this.store.dispatch(new moveEntity(event));
    }
  };
  editEntity(event: any) {
    this.store.dispatch(new editEntity(event))
  }
  touchedEntity() {
    this.store.dispatch(new touchedEntity({}))
  }
  copyEntity(event: any) {
    this.store.dispatch(new copyEntity(event));
  }
  goPreview() {
    this.store.dispatch(new clickOnSubmit(true));
  }
}
