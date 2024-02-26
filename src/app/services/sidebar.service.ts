import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isCollapsed = new BehaviorSubject(false);
  isCollapsed$ = this._isCollapsed.asObservable();

  toggleCollapsed() {
    this._isCollapsed.next(!this._isCollapsed.value);
  }
}
