import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {

  formEntityList: Array<any> = [];

  @Output() addEntityEmit: EventEmitter<any> = new EventEmitter();
  @Output() addGroupEmit: EventEmitter<any> = new EventEmitter();


  @Input() set formEntityList_(value: any) {
    if (value !== undefined) { }
    this.formEntityList = value;
  };

  constructor() { }

  ngOnInit(): void {
  };
  addEntity(event: any) {
    if (event.hasOwnProperty('isGroup') && event.isGroup) {
      this.addGroupEmit.emit(event)
    } else {
      this.addEntityEmit.emit(event)
    }
  }

}
