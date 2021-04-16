import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToogle = new EventEmitter<any>();
  isAuth$: Observable<boolean>;
  isAuthSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store
    ) { }

  ngOnInit(): void {
    // this.isAuthSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

  }


  onSidenavToggle() {
    this.sidenavToogle.emit();
  }

  onLogout() {
    this.authService.logout();
  }


  // ngOnDestroy() {
  //   this.isAuthSubscription.unsubscribe();
  // }

}
