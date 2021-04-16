import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { UiService } from '../ui.service';
import { AuthData } from './auth-data';
import { User} from "./user";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/shared/ui.actions';
import * as Auth from './auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isAuthenticated = false;
  // authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UiService,
    private store: Store<fromRoot.State>
    ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticating());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticating());
        this.router.navigate(['/login']);
        // this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          // this.uiService.loadingStateChanged.next(false);
    this.store.dispatch(new UI.StopLoading());
          console.log(result);
        })
        .catch(err => {
          // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(new UI.StopLoading());
          console.log(err);
          this.uiService.showSnackbar(err.message, null, 3000);
        });
  }


  login(authData: AuthData)  {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch({type: 'STOP_LOADING'});
          console.log(result);
        })
        .catch(err => {
          // this.uiService.loadingStateChanged.next(false);
          this.store.dispatch({type: 'STOP_LOADING'});
          console.log(err);
          this.uiService.showSnackbar(err.message, null, 3000);
        })
  }

  logout() {
    this.afAuth.signOut();
  }


  // isAuth() {
  //   return this.isAuthenticated;
  // }

}
