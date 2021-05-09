import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialougeComponent } from '../../common/confirmationDialouge/confirmation-dialouge/confirmation-dialouge.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { clickOnSubmit } from '../../../store/actions/footerButtonAction';


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  panelOpenState: boolean = true;
  currentFormEntityList: Array<any> = [];
  titleEditMode: boolean = false;
  formEntityGroup: FormGroup;

  groupNameArray: Array<any> = [];
  dropZoneArray: Array<any> = [];
  dragStartGroupindex: any;

  @Output() editGroupNameEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteGroupEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteEntityEmit: EventEmitter<any> = new EventEmitter();
  @Output() dropEntityEmit: EventEmitter<any> = new EventEmitter();
  @Output() editEntityEmit: EventEmitter<any> = new EventEmitter();
  @Output() copyEntityEmit: EventEmitter<any> = new EventEmitter();
  @Output() touchedEntityEmit: EventEmitter<any> = new EventEmitter();


  @Input() set currentFormEntityList_(value: any) {
    if (value !== undefined) { }
    this.currentFormEntityList = value;
    let array = this.formEntityGroup.get('groupArray') as FormArray;
    this.dropZoneArray = []
    this.clearArray(array);
    this.currentFormEntityList.forEach((e: any, i: any) => {
      this.dropZoneArray.push(i + "g")
      this.groupNameArray.push({ name: e.groupName, isEditMode: false });
      let group = new FormGroup({
        groupName: new FormControl(e.groupName),
        groupArray: new FormArray([])
      });
      array.push(group);
      if (e.hasOwnProperty('group') && e.group.length > 0) {
        let group_3 = array.controls[array.controls.length - 1] as FormGroup;
        if (group_3 !== undefined) {
          let groupArray = group_3.get('groupArray') as FormArray;
          e.group.forEach((g: any, j: any) => {
            if (g.entityType == 'button') {
              groupArray.push(new FormGroup({
                listingText: new FormControl(g.listingText),
                entityType: new FormControl(g.entityType),
                name: new FormControl(g.name, [Validators.maxLength(25), Validators.required]),
                responseValidationText: new FormControl(g.responseValidationText, Validators.maxLength(25)),
              }))
            } else if (g.entityType == 'dropdown') {
              groupArray.push(new FormGroup({
                listingText: new FormControl(g.listingText),
                entityType: new FormControl(g.entityType),
                name: new FormControl(g.name, Validators.required),
                label: new FormControl(g.label, [Validators.maxLength(25), Validators.required]),
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
                dropDownOptions: new FormArray([]),
                valid: new FormControl(g.valid),
                touched: new FormControl(g.touched)
              }));
              if (g.dropDownOptions.length > 0) {
                let groupArrayGroup = groupArray.controls[groupArray.controls.length - 1] as FormGroup;
                let dropDownOptionsArray = groupArrayGroup.get('dropDownOptions') as FormArray;
                g.dropDownOptions.forEach((e: any, y: any) => {
                  dropDownOptionsArray.push(new FormGroup({
                    option: new FormControl(e.option)
                  }))
                })
              };
              if (g.touched && !g.valid) {
                group_3.markAllAsTouched();
              }
            } else {
              groupArray.push(new FormGroup({
                listingText: new FormControl(g.listingText),
                entityType: new FormControl(g.entityType),
                name: new FormControl(g.name, Validators.required),
                label: new FormControl(g.label, [Validators.maxLength(25), Validators.required]),
                hintText: new FormControl(g.hintText),
                responseValidationText: new FormControl(g.responseValidationText),
                descriptionText: new FormControl(g.descriptionText),
                hasFooterButton: new FormControl(g.hasFooterButton),
                required: new FormControl(g.required),
                hint: new FormControl(g.hint),
                responseValidation: new FormControl(g.responseValidation),
                description: new FormControl(g.description),
                valid: new FormControl(g.valid),
                touched: new FormControl(g.touched)
              }));
              if (g.touched && !g.valid) {
                group_3.markAllAsTouched();
              }
            }
          });
        }
      };
    });
  };

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private store: Store<AppState>, private router: Router) {
    this.formEntityGroup = new FormGroup({
      groupArray: new FormArray([])
    });
  }

  groupArray(i: any): Array<any> {
    let group = this.groupEntityArray()[i] as FormGroup;
    return (group.get('groupArray') as FormArray).controls;
  }
  groupEntityArray(): Array<any> {
    return (this.formEntityGroup.get('groupArray') as FormArray).controls;
  }

  clearArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  ngOnInit(): void {
    this.store
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state: any) => {
        if (state.buttonActionState.submit) {
          this.touchedEntityEmit.emit();
          if (this.formEntityGroup.valid) {
            this.router.navigate(['create-form/form-preview']);
          }
          this.store.dispatch(new clickOnSubmit(false));
        }
      })
  }
  editGroupTitle(type: any, event?: any, value?: any, index?: any) {
    if (event !== undefined)
      event.stopPropagation();
    if (type == "edit") {
      this.groupNameArray[index].isEditMode = true;
    } else if (type == "save") {
      if (value !== undefined && value !== null && value !== '') {
        this.groupNameArray[index].isEditMode = false;
      } else {
        this.openSnackBar("Enter group name", '')
      }
    } else if (type == "cancel") {
      this.groupNameArray[index].isEditMode = false;
    }
  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  stopPropagation(event: any) {
    event.stopPropagation();
  };
  deleteGroup(event: any, index: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialougeComponent, { data: { textContent: "Are you want to delete this group?" } })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result !== undefined && result == "delete") {
          this.deleteGroupEmit.emit({ index })
        }
      })
  };
  groupNameChange(name: any, i: any) {
    this.groupNameArray[i].name = name;
  }
  getGroup(i: any, j: any) {
    let group = this.groupArray(i)[j] as FormGroup
    return group;
  };
  deleteEntity(i: any, j: any) {
    this.deleteEntityEmit.emit({ groupIndex: i, entityIndex: j })
  }
  copyEntity(i: any, j: any) {
    this.copyEntityEmit.emit({ groupIndex: i, entityIndex: j })
  }
  drop(event: CdkDragDrop<string[]>, groupIndex: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    };
    this.dropEntityEmit.emit({ dragStartGroupIndex: this.dragStartGroupindex, dropGroupIndex: groupIndex, entityPreviousIndex: event.previousIndex, entityCurrentIndex: event.currentIndex });
  };
  dragStart(event: any, groupIndex: any) {
    console.log(groupIndex);
    this.dragStartGroupindex = groupIndex;
  };
  getErrorMessage(i: any, j: any) {
    let errorObject = { hasError: false, type: '' }
    let group = this.getGroup(i, j) as FormGroup;
    let label = group.get('label');
    if (label !== null)
      if (label.hasError('maxlength')) {
        errorObject.hasError = true;
        errorObject.type = 'maxLength'
      } else if (label.hasError('required')) {
        errorObject.hasError = true;
        errorObject.type = 'required'
      };
    return errorObject;
  }
  nameFieldChange(i: any, j: any, event: any) {
    let group = this.getGroup(i, j) as FormGroup;
    let label = group.get('label');
    if (label !== null && !label.value) {
      console.log(label.value);
      group.patchValue({ label: event.target.value })
    };
  }
  formChange(event?: any) {
    this.editEntityEmit.emit(this.formEntityGroup.value);
  }
  valueTypeChange(i: any, j: any) {
    let group = this.getGroup(i, j) as FormGroup
    let array = group.get('dropDownOptions') as FormArray;
    this.clearArray(array);
    this.formChange();
  };
  selectTypeChange() {
    this.formChange();
  }
  addOption(i: any, j: any, event: any) {
    if (event !== undefined)
      event.stopPropagation()
    let group = this.getGroup(i, j) as FormGroup
    let array = group.get('dropDownOptions') as FormArray;
    array.push(new FormGroup({
      option: new FormControl('')
    }));
    this.formChange();
  };
  deleteOption(i: any, j: any, y: any) {
    let group = this.getGroup(i, j) as FormGroup
    let array = group.get('dropDownOptions') as FormArray;
    array.removeAt(y);
    this.formChange();
  }
  getDropDownArray(i: any, j: any): Array<any> {
    let group = this.getGroup(i, j) as FormGroup;
    return (group.get('dropDownOptions') as FormArray).controls;
  }
};
