import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ChallengeModel } from '../types/challenge';
import {
  ChallengeState,
  ChallengesUserState,
} from '../types/challenge.interface';
import { createReducer, on } from '@ngrx/store';
import * as challengeActions from '../actions/challenge.actions';

export const adapter: EntityAdapter<ChallengeModel> =
  createEntityAdapter<ChallengeModel>();

export const initialState: ChallengeState = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const challengeReducers = createReducer(
  initialState,
  on(challengeActions.getAllChallenges, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(challengeActions.getAllChallengesSuccess, (state, action) => {
    return adapter.setAll(action.challenges, { ...state, isLoading: false });
  }),
  on(challengeActions.getAllChallengesFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(challengeActions.deleteChallenge, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(challengeActions.deleteChallengeSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, isLoading: false });
  }),
  on(challengeActions.deleteChallengeFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const adapterChallengeUser: EntityAdapter<ChallengeModel> =
  createEntityAdapter<ChallengeModel>();

export const initialStateChallengeUser: ChallengesUserState =
  adapterChallengeUser.getInitialState({
    isLoading: false,
    error: null,
  });

export const challengeUserReducers = createReducer(
  initialStateChallengeUser,
  on(challengeActions.getChallengesForUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(challengeActions.getChallengesForUserSuccess, (state, action) => {
    return adapterChallengeUser.setAll(action.challenges, {
      ...state,
      isLoading: false,
    });
  }),
  on(challengeActions.getChallengesForUserFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(challengeActions.addChallenge, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(challengeActions.addChallengeSuccess, (state, { challenge }) => {
    const currentList = Object.values(state.entities);
    const newList = [challenge, ...currentList].filter(
      (item): item is ChallengeModel => item !== undefined
    );

    return {
      ...adapterChallengeUser.setAll(newList, state),
      isLoading: false,
    };
  }),
  on(challengeActions.addChallengeFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(challengeActions.deleteChallenge, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(challengeActions.deleteChallengeSuccess, (state, { id }) => {
    return adapterChallengeUser.removeOne(id, { ...state, isLoading: false });
  }),
  on(challengeActions.deleteChallengeFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
