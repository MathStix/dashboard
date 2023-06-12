export interface gameInterface{
  _id: string | null,
  courseId: string,
  code: string | null,
  isStarted: boolean,
  startTime: string | null,
  teamIds: string[] | null,
  playerIds: string[] | null,
  word: string | null
}

export class Game implements gameInterface{
  _id: string | null;
  courseId: string;
  code: string | null;
  isStarted: boolean;
  startTime: string | null;
  teamIds: string[] | null;
  playerIds: string[] | null;
  word: string | null;
  
  constructor( id: string | null, courseId: string, code: string | null, started: boolean, 
    startTime: string | null, teamIds: string[] | null, playerIds: string[] | null, word: string | null )
  {
    this._id = id;
    this.courseId = courseId;
    this.code = code;
    this.isStarted = started;
    this.startTime = startTime;
    this.teamIds = teamIds;
    this.playerIds = playerIds;
    this.word = word
  }
}