import axios from "axios"
import { ref, type Ref } from "vue"
import type { User } from "../models/user"

export const signIn = async (user: User) => {
  let result: { code: number, data: User | any } | null = null

  try {
    result = {
      code: 200,
      data: 'in',
    }
    // await axios.post(`${process.env.VITE_API_USER_URL}/login`, user,{
    //   headers: { 'Content-type': 'application/json' }
    // }).then((response)=> {
    //   if(response.status == 200) {
    //     const user: User = {
    //       id: response.data['id'],
    //       name: response.data['name'],
    //       email: response.data['email'],
    //       password: response.data['password'],
    //     }
    //     result = {
    //       code: response.status,
    //       data: user
    //     }
    //   }
    // });
  } catch (error: any) {
    result = {
      code: error.response.status,
      data: error.response.data
    }
  }

  return result
}