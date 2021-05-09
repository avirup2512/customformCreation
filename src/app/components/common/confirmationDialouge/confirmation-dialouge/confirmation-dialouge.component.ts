import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialouge',
  templateUrl: './confirmation-dialouge.component.html',
  styleUrls: ['./confirmation-dialouge.component.css']
})
export class ConfirmationDialougeComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialougeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close('cancel');
  }
  onDelete() {
    this.dialogRef.close('delete');
  }

}


