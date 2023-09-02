import { createAction, props } from '@ngrx/store';
import { ChallengeModel } from '../types/challenge';

export const getAllChallenges = createAction('[Challenge] Get All Challenges');
export const getAllChallengesSuccess = createAction(
  '[Challenge] Get All Challenges Success',
  props<{ challenges: ChallengeModel[] }>()
);

export const getAllChallengesFailure = createAction(
  '[Challenge] Get All Challenges Failure',
  props<{ error: string }>()
);

export const getChallengesForUser = createAction(
  '[Challenge] Get Challenges For User ',
  props<{ id: number }>()
);

export const getChallengesForUserFailure = createAction(
  '[Challenge] Get Challenges For User Failure',
  props<{ error: string }>()
);

export const getChallengesForUserSuccess = createAction(
  '[Challenge] Get Challenges For User Success ',
  props<{ challenges: ChallengeModel[] }>()
);

export const addChallenge = createAction(
  '[Challenge] Add Challenge ',
  props<{
    challenge: {
      topic: string;
      userId: number;
    };
  }>()
);

export const addChallengeFailure = createAction(
  '[Challenge] Add Challenge Failure',
  props<{ error: string }>()
);

export const addChallengeSuccess = createAction(
  '[Challenge] Add Challenge Success ',
  props<{ challenge: ChallengeModel }>()
);

export const deleteChallenge = createAction(
  '[Challenge] Delete Challenge',
  props<{ id: number }>()
);

export const deleteChallengeSuccess = createAction(
  '[Challenge]Delete Challenge Success',
  props<{ id: number }>()
);

export const deleteChallengeFailure = createAction(
  '[Challenge] Delete Challenge Failure',
  props<{ error: string }>()
);
