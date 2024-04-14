import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DrawerService } from 'src/app/shared/drawer/drawer.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HeaderService } from 'src/app/services/header.service';
import { DrawerConfig } from 'src/app/models/drawer-config';
import { Navigation } from 'src/app/models/navigation';

type sidbarMode = 'shrink' | 'overwrite';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild('container', { read: ElementRef }) container!: ElementRef;
  @ViewChild('drawer', { read: ElementRef }) drawer!: ElementRef;
  @Input() datasource!: Navigation[];
  @Input() content!: HTMLElement;
  private DrawerToggelIcon: { inOpen: string; inClose: string } = {
    inOpen: 'fa fa-chevron-left',
    inClose: 'fa fa-chevron-right',
  };
  public toggelBtnIcon!: string;
  public sidbarMode: sidbarMode = 'shrink';
  public navigationData: Navigation[] = [];
  public navigationConfig!: DrawerConfig;
  public navSelected: string = '';
  public minSidbar_Width: number = 55; //its the default min-width of the drawer

  public isDrawerOpen: boolean = true;
  public isDarkMode: boolean = false;
  public brandImage!: string;
  public Sidbar_Width: number = 200;
  private $destroy: Subject<void> = new Subject<void>();
  private screenWidth: number = window.innerWidth;

  constructor(
    private drawerService: DrawerService,
    private render: Renderer2,
    private headerService: HeaderService
  ) {
    this.getNavigationData().subscribe();
    // this.getNavigationConfigue().subscribe();
    this.getCurrentMode().subscribe((d) => this.getDrawerBrandImage());
    this.toggelDrawerBtnIcon();
    this.getDrawerBrandImage();
    this.handleScreenWidth();
  }

  ngAfterViewInit() {
    this.render.appendChild(this.container.nativeElement, this.content);
  }

  private getCurrentMode(): Observable<boolean> {
    return this.headerService.currentMode().pipe(
      takeUntil(this.$destroy),
      map((mode: boolean) => (this.isDarkMode = mode))
    );
  }

  private getNavigationData(): Observable<Navigation[]> {
    return this.drawerService.getNavigationData().pipe(
      takeUntil(this.$destroy),
      map((data: Navigation[]) => {
        return (this.navigationData = data);
      })
    );
  }
  private getNavigationConfigue(): Observable<DrawerConfig> {
    return this.drawerService.getDrawerConfig().pipe(
      takeUntil(this.$destroy),
      map((dataConfig: DrawerConfig) => {
        this.sidbarMode = dataConfig.mode;
        this.Sidbar_Width = dataConfig.width;
        this.minSidbar_Width = dataConfig.minWidth;
        return (this.navigationConfig = dataConfig);
      })
    );
  }

  public toggelDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.toggelDrawerBtnIcon();
    this.getDrawerBrandImage();
  }
  private closeDrawer(mode: 'fullClose' | 'halfClose'): void {
    if (mode === 'fullClose') {
      this.sidbarMode = 'overwrite';
      this.minSidbar_Width = 0;
    } else {
      // this.drawerService.updateDrawerConfigue(new DrawerConfig('shrink', 55 , 200))
      this.sidbarMode = 'shrink';
      this.minSidbar_Width = 55;
    }
    this.isDrawerOpen = false;
    this.getDrawerBrandImage();
    this.toggelDrawerBtnIcon();
  }
  public openDrawer(): void {
    this.isDrawerOpen = true;
    this.getDrawerBrandImage();
    this.toggelDrawerBtnIcon();
  }
  private toggelDrawerBtnIcon(): void {
    this.isDrawerOpen
      ? (this.toggelBtnIcon = this.DrawerToggelIcon.inOpen)
      : (this.toggelBtnIcon = this.DrawerToggelIcon.inClose);
  }
  private getDrawerBrandImage(): void {
    if (!this.isDarkMode) {
      this.isDrawerOpen
        ? (this.brandImage = '../../../assets/images/logo-light.svg')
        : (this.brandImage = '../../../assets/images/BSIcon_light_mode.svg');
    } else {
      this.isDrawerOpen
        ? (this.brandImage = '../../../assets/images/logo-dark.svg')
        : (this.brandImage = '../../../assets/images/BSIcon_dark_mode.svg');
    }
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
      this.isDrawerOpen
        ? (leftPosition = this.Sidbar_Width)
        : (leftPosition = this.minSidbar_Width);
    } else {
      leftPosition = this.minSidbar_Width;
    }
    return leftPosition;
  }
  // public navItemSelectedHandler(event: any): void {
  //   this.navSelected = event;
  // }
  // public getNavItemSlectedStyle(selected: string): string {
  //   let itemSelectedStyle: string = '';
  //   if (selected === this.navSelected) {
  //     this.isDarkMode
  //       ? (itemSelectedStyle = '#7f6df5')
  //       : (itemSelectedStyle = ' #7f6df5');
  //   } else {
  //     itemSelectedStyle = '#afafb2';
  //   }

  //   return itemSelectedStyle;
  // }


  private handleScreenWidth(): void {
    if (this.screenWidth > 990) {
      this.minSidbar_Width = 55;
      this.openDrawer();
    }
    if (this.screenWidth <= 990 && this.screenWidth > 672) {
      this.closeDrawer('halfClose');
    }
    if (this.screenWidth <= 672) {
      this.closeDrawer('fullClose');
    }
  }
  @HostListener('window:resize', ['$event'])
  onResiZer(event: any) {
    console.log('event :', event.target.innerWidth);
    this.screenWidth = event.target.innerWidth;
    this.handleScreenWidth();
  }
 
  public onClick(event : any){
    if (window.innerWidth < 667){
      if(event.offsetX > 30 || event.offsetY >60){
        this.closeDrawer('fullClose');
      }
      
    }
  }

  ngDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
 
}
