import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumantaionComponent } from './documantaion/documantaion.component';

const routes: Routes = [
  {path: '',  component:DocumantaionComponent } ,

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
