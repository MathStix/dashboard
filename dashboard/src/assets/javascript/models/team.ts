import type { Exercise } from "./exercise";

export interface teamInterface {
  _id: string | null,
  name: string | null,
  playerIds: string[] | null,
  completedExerciseIds: Exercise[] | null,
  unlockedExerciseIds: Exercise[] | null,
  guessedLetters: number[] | null,
  finishTime: string | null,
}

export class Team implements teamInterface {
  _id: string | null;
  name: string | null;
  playerIds: string[] | null;
  completedExerciseIds: Exercise[] | null;
  unlockedExerciseIds: Exercise[] | null;
  guessedLetters: number[] | null;
  finishTime: string | null;

  constructor (id: string | null, name: string | null, playerId: string[] | null, completedExerciseIds: Exercise[] | null, unlockedExerciseIds: Exercise[] | null, guessedLetters: number[] | null, finishTime: string | null ) {
    this._id = id
    this.name = name
    this.playerIds = playerId
    this.completedExerciseIds = completedExerciseIds
    this.unlockedExerciseIds = unlockedExerciseIds,
    this.guessedLetters = guessedLetters
    this.finishTime = finishTime
  }
}