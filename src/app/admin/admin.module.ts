import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { GroupAddEditDialogComponent } from './group/group-add-edit-dialog/group-add-edit-dialog.component';
import { GroupViewDialogComponent } from './group/group-view-dialog/group-view-dialog.component';
import { AdminUserService } from './admin-user/admin-user.service';
import { CreateUpdateUserComponent } from './admin-user/create-update-user/create-update-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { SharedModule } from '../shared/shared.module';
import { SpecialityListComponent } from './speciality/speciality-list/speciality-list.component';
import { DialogFormComponent } from './speciality/dialog-form/dialog-form.component';
import { NavbarComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'students', component: StudentsComponent },
      { path: 'admin-user', component: AdminUserComponent},
      { path: 'faculties', component: FacultiesComponent},
      { path: 'group', component: GroupComponent },
      { path: 'speciality', component: SpecialityListComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    FacultiesComponent,
    GroupComponent,
    GroupAddEditDialogComponent,
    GroupViewDialogComponent,
    StudentsComponent,
    AdminUserComponent,
    CreateUpdateUserComponent,
    SpecialityListComponent,
    DialogFormComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [AdminUserService],
  entryComponents: [
    NavbarComponent,
    CreateUpdateUserComponent,
    DialogFormComponent,
    GroupAddEditDialogComponent,
    GroupViewDialogComponent
  ]
})
export class AdminModule { }
