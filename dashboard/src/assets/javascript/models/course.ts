import type { Exercise } from "./exercise";

export interface CourseInterface {
  _id: string | null,
  title: string
  description: string,
  teacherId: string | null,
  exercises: Exercise[] | null 
}

export class Course implements CourseInterface {
  _id: string | null;
  title: string
  description: string;
  teacherId: string | null;
  exercises: Exercise[] | null;
  
  constructor (id:string | null, title:string, desc: string, teacherId: string | null, exercises: Exercise[] | null){
    this._id = id;
    this.title = title
    this.description = desc;
    this.teacherId = teacherId;
    this.exercises = exercises;
  }
}