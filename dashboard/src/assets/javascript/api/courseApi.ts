import axios from "axios"
import { type ExerciseInterface, Exercise, createExerciseCollection } from "../models/exercise";
import { type CourseInterface, Course } from "../models/course";

export const getCourse = async (id:string) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.get(`${process.env.VITE_API_USER_URL}/course`, {
      data: {'_id': id},
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 200){
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
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
    await axios.get(`${process.env.VITE_API_USER_URL}/course`, {
      data: {'teacherId': id},
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 200){
        const courses = [] as Course[];

        for (let i = 0; i < response.data.length; i++) {
          courses.push(new Course(response.data['_id'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises']))
          )
        }

        result = {
          code: response.status,
          data: courses
        }
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

export const createCourse = async (course:CourseInterface) => {
  let result: { code: number, data: Course | any } | null = null

  try {
    await axios.post(`${process.env.VITE_API_USER_URL}/course`, course, {
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 201){
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
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
    await axios.delete(`${process.env.VITE_API_USER_URL}/course`, {
      data: {'_id': id},
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 200){
        result = {
          code: response.status,
          data: response.data
        }
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
    await axios.put(`${process.env.VITE_API_USER_URL}/course`, course, {
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 201){
        result = {
          code: response.status,
          data: new Course(response.data['_id'], response.data['description'], 
            response.data['teacherId'], createExerciseCollection(response.data['exercises'])
          )
        }
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
    await axios.post(`${process.env.VITE_API_USER_URL}/addexercise`, {
      data: {
        '_id': id,
        'exerciseId': exerciseId
      },
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 201){
        result = {
          code: response.status,
          data: response.data
        }
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
    await axios.post(`${process.env.VITE_API_USER_URL}/removeexercise`, {
      data: {
        '_id': id,
        'exerciseId': exerciseId
      },
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 201){
        result = {
          code: response.status,
          data: response.data
        }
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