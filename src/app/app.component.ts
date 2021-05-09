import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { sessionExpired } from './store/actions/formEntityAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sath';
  constructor(private router: Router, private store: Store<AppState>) {
    setTimeout(() => { this.sessionExpired() }, 10000);
  }

  sessionExpired() {
    console.log('HOOM');
    this.store.dispatch(new sessionExpired({}));
    this.router.navigate([''])
  }

}
