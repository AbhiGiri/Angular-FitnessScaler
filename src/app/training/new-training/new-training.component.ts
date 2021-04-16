import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise';
import { TrainingService } from '../training.service';
import { map } from "rxjs/operators";
import { UiService } from 'src/app/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  // @Output() ongoingTaining = new EventEmitter<any>();

  exercises$: Observable<Exercise[]>;
  // exerciseSubscription: Subscription;
  // loadingSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiServide: UiService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit() {
    // this.loadingSubscription = this.uiServide.loadingStateChanged.subscribe(loading => {
    //   this.isLoading = loading;
    // });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    //   this.exercises = exercises;
    // });
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.getAvailableTraining();
  }
  onStartTraining(form: NgForm) {
    // this.ongoingTaining.emit();
    this.trainingService.startExercise(form.value.exercise);
    console.log(form.value.exercise);

  }

  // ngOnDestroy(): void {
  //   this.exerciseSubscription.unsubscribe();
    // this.loadingSubscription.unsubscribe();
  // }

}
