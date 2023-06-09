export interface answerInterface {
  _id: string,
  texts: string[],
  exerciseId: string,
  teamId: string,
  photos: string[]
}

export class Answer implements answerInterface{
  _id: string;
  texts: string[];
  exerciseId: string;
  teamId: string;
  photos: string[];
  
  constructor(id:string, texts: string[], exerciseId: string, teamId: string, photos: string[]){
    this._id = id
    this.texts = texts
    this.exerciseId = exerciseId,
    this.teamId = teamId
    this.photos = photos
  }

  getImage = (sImg:string):string  => {
    const img = new Image()
    img.src = "data:image/png;base64," + sImg
    return img.src
  }
}