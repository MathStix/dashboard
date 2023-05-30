import axios from "axios"
import { type UpdateUser, type User, Teacher } from "../models/user"

export const signIn = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.post(`${import.meta.env.VITE_API_USER_URL}/login`, user,{
      headers: { 'Content-type': 'application/json' }
    }).then((response)=> {
      console.log(response)
      if(response.status == 200) {
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
          )
        }
      }
    });
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
    await axios.get(`${import.meta.env.VITE_API_USER_URL}/teacher/${id}`, {
      headers: { 'Content-type': 'application/json' }
    }).then((response)=> {
      if(response.status == 200) {
        result = true
      }
    });
  } catch (error: any) {
    result = false
  }

  return result
}

export const getUser = async (id: string) => {
  let result: { code: number, data: User | any } | null = null
  try {
    await axios.get(`${import.meta.env.VITE_API_USER_URL}/teacher/${id}`, {
      headers: { 'Content-type': 'application/json' }
    }).then((response)=> {
      if(response.status == 200) {
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
          )
        }
      }
    });
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
    await axios.post(`${import.meta.env.VITE_API_USER_URL}/teacher`, user, {
      headers: { 'Content-type': 'application/json' }
    }).then((response) => {
      if(response.status == 201) {
        result = {
          code: response.status,
          data: new Teacher (response.data['_id'], response.data['fullName'], 
            response.data['email'], response.data['password']
          )
        }
      }
      else{
        result = {
          code: response.status,
          data: response.data
        }
      }
    });
  } catch (error: any) {
    result = {
      code: 400,
      data: 'nope'
    }
  }

  return result
}

export const deleteAccount = async (user:User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.delete(`${import.meta.env.VITE_API_USER_URL}/teacher`, {
      data: user,
      headers: { 'Content-type': 'application/json' }
    }).then((response) => {
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

export const updateUser = async (user:UpdateUser) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.put(`${import.meta.env.VITE_API_USER_URL}/login`, user,{
      headers: { 'Content-type': 'application/json' }
    }).then((response)=>{
      if(response.status == 201){
        result = {
          code: response.status,
          data: response.data
        }
      }
    });
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}