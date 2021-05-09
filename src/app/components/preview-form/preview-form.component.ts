import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers/reducers';
import { clickOnNext, clickOnPrevious, clickOnSubmit } from '../../store/actions/footerButtonAction';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { onBasicDetailsPage, onEditPage, onPreviwePage } from '../../store/actions/formCreationPageAction';
import { addEntity, addGroup, editEntity, editGroupName, moveEntity, removeEntity, removeGroup } from '../../store/actions/formEntityAction';
@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css']
})
export class PreviewFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  formName: String = '';
  formDescription: String = '';
  formEntityArray: Array<any> = [];

  formHasBeenMade: boolean = false;

  previewForm: FormGroup;

  constructor(private store: Store<AppState>, private router: Router) {
    this.previewForm = new FormGroup({
      groupArray: new FormArray([])
    });
  }
  ngOnInit(): void {
    this.store.dispatch(new onBasicDetailsPage(false));
    this.store.dispatch(new onEditPage(false));
    this.store.dispatch(new onPreviwePage(true));
    this.store
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: any) => {
        console.log(state);
        this.formName = state.basicDetailsState.formName;
        this.formDescription = state.basicDetailsState.description;
        if (state.formEntityState.currentFormentityList.length > 0 && !this.formHasBeenMade) {
          this.formEntityArray = state.formEntityState.currentFormentityList;
          this.makeForm(this.formEntityArray);
        }
        if (state.buttonActionState.previous) {
          this.router.navigate(['create-form/form-edit']);
          this.store.dispatch(new clickOnPrevious(false));
        };
      })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };
  makeForm(array: any) {
    let formArray = this.previewForm.get('groupArray') as FormArray;
    if (array.length > 0) {
      array.forEach((e: any, i: any) => {
        let group = new FormGroup({
          groupName: new FormControl(e.groupName),
          groupArray: new FormArray([])
        });
        formArray.push(group);
        if (e.hasOwnProperty('group') && e.group.length > 0) {
          let group_3 = formArray.controls[formArray.controls.length - 1] as FormGroup;
          if (group_3 !== undefined) {
            let groupArray = group_3.get('groupArray') as FormArray;
            e.group.forEach((g: any, j: any) => {
              if (g.entityType == 'button') {
                groupArray.push(new FormGroup({
                  listingText: new FormControl(g.listingText),
                  entityType: new FormControl(g.entityType),
                  entityId: new FormControl(g.entityId),
                  name: new FormControl(g.name, Validators.maxLength(25)),
                  responseValidationText: new FormControl(g.responseValidationText, Validators.maxLength(25)),
                }))
              } else if (g.entityType == 'dropdown') {
                let newGroup = new FormGroup({
                  listingText: new FormControl(g.listingText),
                  entityType: new FormControl(g.entityType),
                  entityId: new FormControl(g.entityId),
                  name: new FormControl(g.name),
                  label: new FormControl(g.label, Validators.maxLength(25)),
                  hintText: new FormControl(g.hintText),
                  responseValidationText: new FormControl(g.responseValidationText),
                  descriptionText: new FormControl(g.descriptionText),
                  hasFooterButton: new FormControl(g.hasFooterButton),
                  required: new FormControl(g.required),
                  hint: new FormControl(g.hint),
                  responseValidation: new FormControl(g.responseValidation),
                  description: new FormControl(g.description),
                  valueType: new FormControl(g.valueType),
                  selectType: new FormControl(g.selectType),
                  url: new FormControl(g.url),
                  dropDownOptions: new FormArray([])
                });
                newGroup.addControl(g.entityId, new FormControl(''));
                groupArray.push(newGroup);
                if (g.dropDownOptions.length > 0) {
                  let groupArrayGroup = groupArray.controls[groupArray.controls.length - 1] as FormGroup;
                  let dropDownOptionsArray = groupArrayGroup.get('dropDownOptions') as FormArray;
                  g.dropDownOptions.forEach((e: any, y: any) => {
                    dropDownOptionsArray.push(new FormGroup({
                      option: new FormControl(e.option)
                    }))
                  })
                }
              } else {
                let newGroup = new FormGroup({
                  listingText: new FormControl(g.listingText),
                  entityType: new FormControl(g.entityType),
                  entityId: new FormControl(g.entityId),
                  name: new FormControl(g.name),
                  label: new FormControl(g.label, Validators.maxLength(25)),
                  hintText: new FormControl(g.hintText),
                  responseValidationText: new FormControl(g.responseValidationText),
                  descriptionText: new FormControl(g.descriptionText),
                  hasFooterButton: new FormControl(g.hasFooterButton),
                  required: new FormControl(g.required),
                  hint: new FormControl(g.hint),
                  responseValidation: new FormControl(g.responseValidation),
                  description: new FormControl(g.description)
                });
                if (g.entityType == "textField" || g.entityType == "textArea" || g.entityType == "dateField") {
                  newGroup.addControl(g.entityId, new FormControl(''));
                }
                groupArray.push(newGroup);
              }
            });
          }
        }
      })
    };
    console.log(array);
    console.log(this.previewForm.value);

  }
  groupArray(i: any): Array<any> {
    let group = this.groupEntityArray()[i] as FormGroup;
    return (group.get('groupArray') as FormArray).controls;
  }
  groupEntityArray(): Array<any> {
    return (this.previewForm.get('groupArray') as FormArray).controls;
  }
  goEdit() {
    this.store.dispatch(new clickOnPrevious(true));
  }
}
