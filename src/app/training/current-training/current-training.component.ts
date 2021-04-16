import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { StopTraining } from './stop-training.component';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  // @Output() exitTimer = new EventEmitter();
  progress = 0;
  timer;
  // timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService:TrainingService,
    private store: Store<fromTraining.State>

    ) { }

  ngOnInit(): void {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if(this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);

    })
  }

  onStopTimer() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTraining, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // this.exitTimer.emit();
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.onStartOrResumeTimer();
      }

    })
  }


}
