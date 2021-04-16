import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UiService } from '../ui.service';
import { Exercise } from './exercise';
// import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/shared/ui.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;
  exerciseChanged =  new Subject<Exercise>();
  exercisesChanged =  new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];

  private exercises: Exercise[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
    ) { }

  getAvailableTraining() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      // throw(new Error());
      return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...<Object>(doc.payload.doc.data())
          }
        })
      }))
      .subscribe((exercises: Exercise[]) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        // this.availableExercise = exercises;
        // this.exercisesChanged.next([...this.availableExercise]);
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      },
      error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, try again!!!', null, 3000);
        this.exercisesChanged.next(null);
      }))
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()})
    // this.runningExercise = this.availableExercise.find(ex =>
    //   ex.id === selectedId
    //   );
    // this.exerciseChanged.next({...this.runningExercise});
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      // console.log(...ex);
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'Completed'
      });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
      })
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      console.log(progress);
      console.log(ex);


    this.addDataToDatabase({
      ...ex,
      duration: ex.duration * (progress / 100),
      calories: ex.calories * (progress / 100),
      date: new Date(),
      state: 'Cancelled',
    });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopTraining());
    })
  }
  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  fetchCompletedOrCancelledExercise() {
    // return this.exercises.slice();
    this.fbSubs.push(this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      // this.finishedExercisesChanged.next(exercises);
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }));
  }
  cancelSubscription() {
    this.fbSubs.forEach(subs => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

}
