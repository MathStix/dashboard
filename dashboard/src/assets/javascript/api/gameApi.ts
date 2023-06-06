import axios from "axios"
import { options } from "./apiOptions";
import { Game, type gameInterface } from "../models/game";

export const getGame = async (id: string) => {
  let result: { code: number | any, data: Game | any } | null = null

  try {
    await axios.request(options('GET', `/game/${id}`, null))
      .then((response) => {
        result = {
          code: response.status,
          data: new Game(response.data['_id'], response.data['courseId'], response.data['code'], 
            response.data['isStarted'], response.data['startTime'], response.data['teamIds'], 
            response.data['playerIds'], response.data['word']
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

export const startGame = async (id:string) => {
  let result: { code: number | any, data: Game | any } | null = null

  try {
    await axios.request(options('POST', `/start/${id}`, {}))
      .then((response) => {
        result = {
          code: response.status,
          data: new Game(response.data['_id'], response.data['courseId'], response.data['code'], 
            response.data['isStarted'], response.data['startTime'], response.data['teamIds'], 
            response.data['playerIds'], response.data['word']
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