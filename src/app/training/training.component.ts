import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$: Observable<boolean>;
  exerciseSubscription: Subscription

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
    ) {

   }

  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(ex => {
    //   if(ex) {
    //     this.trainingStart = true;
    //   } else {
    //     this.trainingStart = false;
    //   }
    // });
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);


  }

  // ngOnDestroy(): void {
  //   this.exerciseSubscription.unsubscribe();
  // }


}
