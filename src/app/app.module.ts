import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared_/material.module';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PreviewFormComponent } from './components/preview-form/preview-form.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ParentFormCreationComponent } from './parent-form-creation/parent-form-creation.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/reducers';
import { RightPanelComponent } from './components/edit-form/right-panel/right-panel.component';
import { LeftPanelComponent } from './components/edit-form/left-panel/left-panel.component';
import { ConfirmationDialougeComponent } from './components/common/confirmationDialouge/confirmation-dialouge/confirmation-dialouge.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    BasicDetailsComponent,
    EditFormComponent,
    PreviewFormComponent,
    HeaderComponent,
    ParentFormCreationComponent,
    FooterComponent,
    RightPanelComponent,
    LeftPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
