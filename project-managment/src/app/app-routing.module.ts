import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { UsersComponent } from './layouts/users/users.component';
import { DashboardComponent } from './Views/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'admin', component:AdminComponent} ,
  {path: '', component:UsersComponent , 
    children: [
        {path: 'dashboard' , loadChildren: ()=> import('./Views/dashboard/dashboard.module').then(m => m.DashboardModule) },
        {path: 'projects' , loadChildren: ()=> import('./Views/projects/projects.module').then(m => m.ProjectsModule) },
        {path: 'tasks' , loadChildren: ()=> import('./Views/tasks/tasks.module').then(m => m.TasksModule) },
        {path: 'teams' , loadChildren: ()=> import('./Views/teams/teams.module').then(m => m.TeamsModule) },
        {path: 'messages' , loadChildren: ()=> import('./Views/messages/messages.module').then(m => m.MessagesModule) },
        {path: 'settings' , loadChildren: ()=> import('./Views/settings/settings.module').then(m => m.SettingsModule) },
        {path: 'doc' , loadChildren: ()=> import('./Views/documentation/documentation.module').then(m => m.DocumentationModule) },
    ] 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
