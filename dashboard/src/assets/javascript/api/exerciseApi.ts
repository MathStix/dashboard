import axios from "axios"
import { type ExerciseInterface, Exercise, createExerciseCollection } from "../models/exercise";
import { options } from "./apiOptions";

export const createExercise = async (exercide:ExerciseInterface) => {
  let result: { code: number, data: Exercise | any } | null = null
  
  try {
    await axios.request(options('POST', '/exercise', exercide))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Exercise (
            response.data['_id'], response.data['title'], response.data['description'], response.data['answer'], 
            response.data['location'], response.data['photo'], response.data['activationRange'], response.data['exerciseType'], null
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

export const getExercise = async (id:string) => {
  let result: { code: number, data: Exercise | any } | null = null
  
  try {
    await axios.request(options('GET', `/exercise/${id}`, null))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Exercise (
            response.data['_id'], response.data['title'], response.data['description'], response.data['answer'], 
            response.data['location'], response.data['photo'], response.data['activationRange'], response.data['exerciseType'], null
          )
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result;
}

export const getAll = async (id:string) => {
  let result: { code: number, data: Exercise[] | any } | null = null
  
  try {
    await axios.request(options('GET', `/getallexercises/${id}`, null))
      .then((response) => {
        result = {
          code: response.status,
          data: createExerciseCollection(response.data)
        }
      })
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result;
}

export const deleteExercise = async (id:string) => {
  let result: { code: number, data: Exercise | any } | null = null

  try {
      await axios.request(options('DELETE', '/exercise', {'_id': id}))
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

export const updateExercise = async (exercise:ExerciseInterface) => {
  let result: { code: number, data: Exercise | any } | null = null

  try {
    await axios.request(options('PUT', '/exercise', exercise))
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

//Game
export const StartGameTemp = async (id: string) => {
  let result: { code: number, data: Exercise | any } | null = null
  console.log('in')
  try {
    await axios.post(`${import.meta.env.VITE_API_USER_URL}/exercise`, {
      data: { '_id': id },
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      console.log(response)
      if(response.status == 201){
        result = {
          code: response.status,
          data: response.data
        }
      }
    })
  } catch (error: any) {
    console.log(error);
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}