import { Exercise } from './exercise';
import { SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from './training.actions';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  // isAuthenticated: boolean
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
};

export interface State extends fromRoot.State {
  training: TrainingState;
}

const inititalState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = inititalState, action: TrainingActions)  {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        // isAuthenticated: true
        ...state,
        availableExercises: action.payload
      };
      console.log(state);

    case SET_FINISHED_TRAININGS:
      return {
        // isAuthenticated: false
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        // isAuthenticated: false
        ...state,
        activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING:
      return {
        // isAuthenticated: false
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');
console.log(getTrainingState);


export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinisedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);


