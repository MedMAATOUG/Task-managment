import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {
  }
  private $mode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $currentMode: Observable<boolean> = this.$mode.asObservable();
  public  currentMode(): Observable<boolean> {
    return this.$currentMode;
  }

  public changeMode(mode: boolean): void {
    this.$mode.next(mode);
  }
}
