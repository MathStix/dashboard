import { getExercise } from "../api/exerciseApi";
import type { Exercise } from "./exercise";

export interface answerInterface {
  _id: string,
  texts: string[],
  exerciseId: string,
  teamId: string,
  photos: string[],
  exercise: Exercise | null
}

export class Answer implements answerInterface{
  _id: string;
  texts: string[];
  exerciseId: string;
  teamId: string;
  photos: string[];
  exercise: Exercise | null;
  
  constructor(id:string, texts: string[], exerciseId: string, teamId: string, photos: string[]){
    this._id = id
    this.texts = texts
    this.exerciseId = exerciseId,
    this.teamId = teamId
    this.photos = photos
    this.exercise = null
  }

  getExercise = async () => {
    const reslut = await getExercise(this.exerciseId)
    this.exercise = reslut?.data
  }

  getImage = (sImg:string):string  => {
    const img = new Image()
    img.src = "data:image/jpeg;base64," + sImg.replace("[", "").replace('"',"").replace("]","").replace('"',"")
    return img.src
  }
}