import type { Exercise } from "./exercise";

export interface CourseInterface {
  _id: number,
  description: string,
  teacherId: number,
  exercises: Exercise[] | null 
}

export class Course implements CourseInterface {
  _id: number;
  description: string;
  teacherId: number;
  exercises: Exercise[] | null;
  
  constructor (id:number, desc: string, teacherId: number, exercises: Exercise[] | null){
    this._id = id;
    this.description = desc;
    this.teacherId = teacherId;
    this.exercises = exercises;
  }
}