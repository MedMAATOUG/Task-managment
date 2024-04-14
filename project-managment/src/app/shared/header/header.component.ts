import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() openDrawerEvent: EventEmitter<void> = new EventEmitter();
  public isDarkMode!: boolean;
  private $destroy: Subject<void> = new Subject<void>();

  constructor(
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.getCurrentMode().subscribe();
  }

  private getCurrentMode(): Observable<boolean> {
    return this.headerService.currentMode().pipe(
      takeUntil(this.$destroy),
      map((mode: boolean) => (this.isDarkMode = mode))
    );
  }

  public toggelMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.headerService.changeMode(this.isDarkMode);
  }
  public toggelModeBtnIcon(): string {
    let icon: string;
    this.isDarkMode
      ? (icon = 'fa-solid fa-toggle-on')
      : (icon = 'fa-solid fa-toggle-off');
    return icon;
  }

  public openDrawer(): void {
    this.openDrawerEvent.emit();
    console.log('openDrawer from header');
  }

  ngDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
