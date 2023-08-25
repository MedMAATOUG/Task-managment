import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ], 
  exports: [
    AdminComponent,
    UsersComponent
  ]
})
export class LayoutsModule { }
