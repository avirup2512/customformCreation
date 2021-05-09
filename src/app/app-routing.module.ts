import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PreviewFormComponent } from './components/preview-form/preview-form.component';
import { ParentFormCreationComponent } from './parent-form-creation/parent-form-creation.component';

const routes: Routes = [
  {
    path: 'create-form', component: ParentFormCreationComponent,
    children: [
      { path: 'basic-details', component: BasicDetailsComponent },
      { path: 'form-edit', component: EditFormComponent },
      { path: 'form-preview', component: PreviewFormComponent },
      { path: '', redirectTo: "basic-details", pathMatch: "full" },
    ]
  },
  { path: '', redirectTo: '/create-form/basic-details', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
