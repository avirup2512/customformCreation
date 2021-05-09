import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  basicdetailsForm: FormGroup;

  inBasicDetailsPage: boolean = true;
  inEditPage: boolean = false;
  inPreviewPage: boolean = false;

  @Input() set inPreviewPage_(value: any) {
    if (value !== undefined) { }
    this.inPreviewPage = value;
  };
  @Input() set inEditPage_(value: any) {
    if (value !== undefined) { }
    this.inEditPage = value;
  };

  @Input() set inBasicDetailsPage_(value: any) {
    if (value !== undefined) { }
    this.inBasicDetailsPage = value;
  }

  constructor() {
    this.basicdetailsForm = new FormGroup({
      floatLabelControl: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

}
