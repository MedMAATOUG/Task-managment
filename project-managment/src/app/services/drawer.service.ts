import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NavItem } from '../models/nav-item';
type mode = 'shrink' | 'overwrite';
type width = number;
type minWidth = number;
export type drawerConfigues = [mode, width, minWidth]  ;
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private  drawerConfigue: drawerConfigues = ['shrink', 200, 55];
  private  _drawerConfig : BehaviorSubject<drawerConfigues> = new BehaviorSubject<drawerConfigues>(this.drawerConfigue)
  private $drawerConfig : Observable<drawerConfigues> = this._drawerConfig.asObservable(); 
  constructor() { 

  }
  public getNavigationData() : Observable<NavItem[]>{
    const  navigation : NavItem[] = [
      {
        title: 'dashboard',
        url: '/dashboard',
        icon: 'fa-brands fa-windows'
        
      },
      {
        title: 'projects',
        url: '/projects',
        icon: 'fa-solid fa-layer-group'
      },
      {
        title: 'tasks',
        url: '/tasks',
        icon: 'fa-solid fa-bars-progress'
      },
      {
        title: 'teams',
        url: '/teams',
        icon: 'fa-regular fa-user'
      },
      {
        title: 'documentation',
        url: '/doc',
        icon: 'fa-solid fa-file'
      },
      {
        title: 'messages',
        url: '/messages',
        icon: 'fa-brands fa-facebook-messenger'
      },
      {
        title: 'settings',
        url: '/settings',
        icon: 'fa-solid fa-gear'
      },
      
    ];

    return of(navigation);
  }

  public getDrawerConfig(): Observable<drawerConfigues> {
    // return this.http.get<drawerConfigues>('url');
    return this.$drawerConfig 
  }

  public updateDrawerConfigue(newConfig: drawerConfigues): void {
    // this.http.post<drawerConfigues>('url', newConfig);

    this.drawerConfigue = newConfig;
  }





}
