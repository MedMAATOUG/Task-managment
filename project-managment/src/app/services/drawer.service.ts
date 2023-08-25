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
  private  drawerConfigue: drawerConfigues = ['shrink', 300, 100];
  private  _drawerConfig : BehaviorSubject<drawerConfigues> = new BehaviorSubject<drawerConfigues>(this.drawerConfigue)
  private $drawerConfig : Observable<drawerConfigues> = this._drawerConfig.asObservable(); 
  constructor() { 

  }
  public getNavigationData() : Observable<NavItem[]>{
    const  navigation : NavItem[] = [
      {
        title: 'dashboard',
        url: '/dashboard',
        icon: 'mediumiconslayout'
      },
      {
        title: 'projects',
        url: '/projects',
        icon: 'description'
      },
      {
        title: 'tasks',
        url: '/tasks',
        icon: 'selectall'
      },
      {
        title: 'teams',
        url: '/teams',
        icon: 'group'
      },
      {
        title: 'documentation',
        url: '/document',
        icon: 'inactivefolder'
      },
      {
        title: 'messages',
        url: '/messages',
        icon: 'message'
      },
      {
        title: 'settings',
        url: '/settings',
        icon: 'preference'
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
