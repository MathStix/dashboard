export interface ExerciseInterface {
  _id: number,
  title: string,
  description: string,
  answer: string,
  location: string,
  photo: string,
  activationRange: string,
  exerciseType: string,
  teacherId: number | null
}

export class Exercise implements ExerciseInterface {
  _id: number;
  title: string;
  description: string;
  answer: string;
  location: string;
  photo: string;
  activationRange: string;
  exerciseType: string;
  teacherId: number | null;
  
  constructor(id: number, title: string, description: string, answer: string, 
    location: string, photo: string, activation: string, type: string, teacherId: number | null) {
      this._id = id;
      this.title = title;
      this.description = description;
      this.answer = answer;
      this.location = location;
      this.photo = photo;
      this.activationRange = activation;
      this.exerciseType = type;
      this.teacherId = teacherId;
  }

  getImage = ():string  => {
    const img = new Image()
    img.src = "data:image/png;base64," + this.photo

    return img.src
  }
}

export const createExerciseCollection = (data: any): Exercise[] => {
  const exercises = [] as Exercise[]

  for (let i = 0; i < data.length; i++) {
    exercises.push(new Exercise(
      data[i]['_id'], data[i]['title'], data[i]['description'], data[i]['answer'], 
      data[i]['location'], data[i]['photo'], data[i]['activationRange'], data[i]['exerciseType'], null
    ))
  }

  return exercises
}