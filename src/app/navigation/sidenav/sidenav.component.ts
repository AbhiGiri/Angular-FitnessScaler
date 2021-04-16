import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  isAuth$: Observable<boolean>;
  isAuthSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.isAuthSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
    this.authService.logout();
  }

  onLogout() {
    this.closeSidenav.emit();
    this.authService.logout();
  }

  // ngOnDestroy() {
  //   this.isAuthSubscription.unsubscribe();
  // }

}
