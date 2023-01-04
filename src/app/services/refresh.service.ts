import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshSubject = new Subject<void>();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  refresh$ = this.refreshSubject.asObservable();

  refresh() {
    this.refreshSubject.next();
  }
}
