import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerComponent } from './drawer/drawer.component';

import { RouterModule } from '@angular/router';
import { SidbarwidthDirective } from './directives/sidbarwidth.directive';
import { ContentPositionDirective } from './directives/content-position.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DxTextBoxModule } from 'devextreme-angular';

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
    
    FontAwesomeModule,
    IonicModule,
    RouterModule,
    FlexLayoutModule,
    DxTextBoxModule

    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DrawerComponent, 
    
  ]
})
export class SharedModule { }
