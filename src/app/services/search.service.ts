import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private query = new BehaviorSubject<string>('');
  currentQuery = this.query.asObservable();

  constructor() {}

  changeQuery(query: string) {
    this.query.next(query);
  }
}
