import axios from "axios"
import { type UpdateUser, type User, Teacher } from "../models/user"
import { options } from "./apiOptions";

export const signIn = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.request(options('POST', '/login', user))
      .then((response) => {
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
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

export const checkUser = async (id: string) => {
  let result: Boolean = false

  try {
    await axios.request(options('GET', `/teacher/${id}`, null))
      .then((response)=>{
        if(response.status == 200) {
          result = true
        }
      })
  } catch (error: any) {
    result = false
  }

  return result
}

export const getUser = async (id: string) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.request(options('GET', `/teacher/${id}`, null))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
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

export const signUp = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.request(options('POST', '/teacher', user))
      .then((response)=>{
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
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

export const deleteAccount = async (user:User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.request(options('DELETE', '/teacher', user))
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

export const updateUser = async (user:UpdateUser) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.request(options('put', '/login', user))
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