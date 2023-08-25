import {
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { NavItem } from 'src/app/models/nav-item';
import { DrawerService } from 'src/app/services/drawer.service';
import { DrawerComponent } from 'src/app/shared/drawer/drawer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;
  @ViewChild(DrawerComponent) drawer!: DrawerComponent;
  public navigationData!: NavItem[];
  private $destroy: Subject<void> = new Subject<void>();
  constructor(private drawerService: DrawerService) {
    this.getNavigationData().subscribe();
    console.log('dataNavigation :' , this.navigationData)
  }

  private getNavigationData(): Observable<NavItem[]> {
    return this.drawerService.getNavigationData().pipe(
      takeUntil(this.$destroy),
      map((navData: NavItem[]) => (this.navigationData = navData))
    );
  }

  ngDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
