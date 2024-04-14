import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Navigation } from 'src/app/models/navigation';
import { DrawerConfig } from 'src/app/models/drawer-config';
Config: DrawerConfig;
@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerConfigue: DrawerConfig = {
    mode: 'shrink',
    width: 200,
    minWidth: 55,
  };
  private _drawerConfig: BehaviorSubject<DrawerConfig> =
    new BehaviorSubject<DrawerConfig>(this.drawerConfigue);
  private $drawerConfig: Observable<DrawerConfig> =
    this._drawerConfig.asObservable();
  constructor(private dataService: DataService) {}
  public getNavigationData(): Observable<Navigation[]> {
    const navigation: Navigation[] = [
      new Navigation('dashboard', '/dashboard', 'fa-brands fa-windows'),
      new Navigation('projects', '/projects', 'fa-solid fa-layer-group'),
      new Navigation('tasks', '/tasks', 'fa-regular fa-square-check'), 
      new Navigation('teams', '/teams', 'fa-regular fa-user'),
      new Navigation('documentation', '/doc', 'fa-solid fa-file'),
      new Navigation(
        'messages',
        '/messages',
        'fa-brands fa-facebook-messenger'
      ),
      new Navigation('settings', '/settings', 'fa-solid fa-gear'),
    ];

    return of(navigation);
  }

  public getDrawerConfig(): Observable<DrawerConfig> {
    // return this.http.get<drawerConfigues>('url');
    return this.$drawerConfig;
  }

  public updateDrawerConfigue(newConfig: DrawerConfig): void {
    // this.http.post<drawerConfigues>('url', newConfig);
    // this.drawerConfigue = newConfig;
    this._drawerConfig.next(newConfig)
  }
}
