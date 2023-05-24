import axios from "axios"
import { ref, type Ref } from "vue"
import type { UpdateUser, User } from "../models/user"

export const signIn = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    // if(user.email == 'admin@admin.com' && user.password == 'adminadmin'){
    //   result = {
    //     code: 200,
    //     data: 'in',
    //   }
    // }else{
    //   result = {
    //     code: 400,
    //     data: 'uit',
    //   }
    // }

    // api call below

    await axios.post(`${process.env.VITE_API_USER_URL}/login`, user,{
      headers: { 'Content-type': 'application/json' }
    }).then((response)=> {
      if(response.status == 200) {
        const user: User = {
          id: response.data['id'],
          fullName: response.data['fullName'],
          email: response.data['email'],
          password: response.data['password'],
        }
        result = {
          code: response.status,
          data: user
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
    if(id == '1'){
      result = true
    }else{
      result = false
    }

    // api call below

    await axios.post(`${process.env.VITE_API_USER_URL}/check`, id,{
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

export const signUp = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.post(`${process.env.VITE_API_USER_URL}/teacher`, user, {
      headers: { 'Content-type': 'application/json' }
    }).then((response) => {
      if(response.status == 200) {
        const user: User = {
          id: response.data['id'],
          fullName: response.data['fullName'],
          email: response.data['email'],
          password: response.data['password'],
        }
        result = {
          code: response.status,
          data: user
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

export const deleteAccount = async (user:User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    await axios.delete(`${process.env.VITE_API_USER_URL}/teacher`, {
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
    await axios.put(`${process.env.VITE_API_USER_URL}/login`, user,{
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