import {
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { DrawerService } from 'src/app/shared/drawer/drawer.service';
import { DrawerComponent } from 'src/app/shared/drawer/drawer.component';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;
  @ViewChild(DrawerComponent) drawer!: DrawerComponent;
  public navigationData!: Navigation[];
  private $destroy: Subject<void> = new Subject<void>();
  constructor(private drawerService: DrawerService) {
    this.getNavigationData().subscribe();
    console.log('dataNavigation :', this.navigationData);
  }

  private getNavigationData(): Observable<Navigation[]> {
    return this.drawerService.getNavigationData().pipe(
      takeUntil(this.$destroy),
      map((navData: Navigation[]) => (this.navigationData = navData))
    );
  }

  public openDrawerFromHeader() : void {
    this.drawer.openDrawer()
  }
  ngDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
