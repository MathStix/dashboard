export interface ExerciseInterface {
  _id: number | null,
  title: string,
  description: string,
  answer: string,
  location: string,
  photo: string | null,
  activationRange: string,
  exerciseType: string,
  teacherId: string | null
}

export class Exercise implements ExerciseInterface {
  _id: number | null;
  title: string;
  description: string;
  answer: string;
  location: string;
  photo: string | null;
  activationRange: string;
  exerciseType: string;
  teacherId: string | null;
  
  constructor(id: number | null, title: string, description: string, answer: string, 
    location: string, photo: string | null, activation: string, type: string, teacherId: string | null) {
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

  genarateBase64 = (file: any) => {
    console.log(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      
      const base64String = (<string>reader.result)
        .replace('data:', '')
        .replace(/^.+,/, '');

      this.photo = base64String.toString()
    };
    reader.readAsDataURL(file);

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