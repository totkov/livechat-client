import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSettings$ = new Subject<Alert>();

  constructor() { }

  create(title: string, type: string, body: string) {
    this.alertSettings$.next({
      title,
      type,
      body
    });
  }
}
