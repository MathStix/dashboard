import axios from "axios"
import { type ExerciseInterface, Exercise, createExerciseCollection } from "../models/exercise";
import { type CourseInterface, Course } from "../models/course";
import { options } from "./apiOptions";

export const getCourse = async (id:string) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.request(options('GET', `/course/${id}`, null))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['title'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}

export const getAllCourse = async (id:string) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.request(options('GET', `/getallcourses/${id}`, null))
      .then((response)=>{
        const courses = [] as Course[];

        for (let i = 0; i < response.data.length; i++) {
          courses.push(new Course(response.data[i]['_id'], response.data[i]['title'], response.data[i]['description'], 
            response.data[i]['teacherId'], createExerciseCollection(response.data[i]['exercises']))
          )
        }

        result = {
          code: response.status,
          data: courses
        }
      })
  } catch (error: any) {
    console.log(error)
    result = {
      code: 0,
      data: 'error'
    }
  }

  return result
}

export const createCourse = async (course:CourseInterface) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.request(options('POST', '/course', course))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['title'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}

export const deleteCourse = async (id:string) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.request(options('DELETE', '/course', {'_id': id}))
      .then((response)=>{
        result = {
          code: response.status,
          data: response.data
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}

export const updateCourse = async (course:CourseInterface) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.request(options('PUT', '/course', course))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['title'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}

export const addExercise = async (id:string, exerciseId: string) => {
  let result: { code: number, data: Course | any } | null = null
  
  try {
    await axios.request(options('POST', '/addexercise', {'_id': id, 'exerciseId': exerciseId}))
      .then((response)=>{
        result = {
          code: response.status,
          data: response.data
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}

export const deleteExercise = async (id:string, exerciseId: string) => {
  let result: { code: number, data: Course | any } | null = null
  
  try {
    await axios.request(options('POST', '/removeexercise', {'_id': id,'exerciseId': exerciseId}))
      .then((response)=>{
        result = {
          code: response.status,
          data: response.data
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}