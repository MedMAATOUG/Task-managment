import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerComponent } from './drawer/drawer.component';
import {
   DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule,
} from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { SidbarwidthDirective } from './directives/sidbarwidth.directive';
import { ContentPositionDirective } from './directives/content-position.directive';

@NgModule({
  declarations: [
    SidbarwidthDirective,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
    ContentPositionDirective
  ],
  imports: [
    RouterModule, 
    CommonModule,
    DxDrawerModule, DxListModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DrawerComponent, 
    
  ]
})
export class SharedModule { }
