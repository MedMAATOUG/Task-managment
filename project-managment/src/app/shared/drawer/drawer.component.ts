import { Component, ElementRef, Input, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NavItem } from 'src/app/models/nav-item';
import {
  DrawerService,
  drawerConfigues,
} from 'src/app/services/drawer.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

type sidbarMode = 'shrink' | 'overwrite';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('container',{read:ElementRef}) container! : ElementRef
  @Input() datasource! : NavItem[]
  @Input() content ! :  HTMLElement; 

  private $destroy: Subject<void> = new Subject<void>();
  public isDrawerOpen: boolean = false;
  public Sidbar_Width: number = 400;
  public minSidbar_Width: number = 0;
  public navigationConfig!: drawerConfigues;
  public navigationData: NavItem[] = [];
  public sidbarMode: sidbarMode = 'shrink';

  constructor(private drawerService: DrawerService , private render : Renderer2) {
    this.getNavigationData().subscribe();
    this.getNavigationConfigue().subscribe();
    console.log(this.navigationData);
    console.log(this.navigationConfig);
  }

  ngAfterViewInit() {
    this.render.appendChild(this.container.nativeElement , this.content); 
    console.log('data :' , this.datasource);

  }

  private getNavigationData(): Observable<NavItem[]> {
    return this.drawerService.getNavigationData().pipe(
      takeUntil(this.$destroy),
      map((data: NavItem[]) => {
        return (this.navigationData = data);
      })
    );
  }
  private getNavigationConfigue(): Observable<drawerConfigues> {
    return this.drawerService.getDrawerConfig().pipe(
      takeUntil(this.$destroy),
      map((dataConfig : drawerConfigues) => { 
        this.sidbarMode = dataConfig[0];
        this.Sidbar_Width = dataConfig[1];
        this.minSidbar_Width= dataConfig[2];
        return this.navigationConfig = dataConfig})
    );

  }

  public toggelDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public sidbarWidthValue(): number {
    let widthValue: number = 0;
    this.isDrawerOpen
      ? (widthValue = this.Sidbar_Width)
      : (widthValue = this.minSidbar_Width);
    return widthValue;
  }
  public contentPosition(): number {
    let leftPosition: number = 0;
    if (this.sidbarMode === 'shrink') {
      console.log('shrink mode')
      this.isDrawerOpen
        ? (leftPosition = this.Sidbar_Width)
        : (leftPosition = this.minSidbar_Width);
    } else {
      leftPosition = this.minSidbar_Width;
    }
    return leftPosition;
  }
}
