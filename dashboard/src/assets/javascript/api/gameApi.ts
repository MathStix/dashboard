import axios from "axios"
import { options } from "./apiOptions";
import { Game, type gameInterface } from "../models/game";
import { Team } from "../models/team";
import { Answer } from "../models/answer";

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

export const genarateTeams = async (id:string, teamMax:number) => {
  let result: { code: number | any, data: Game | any } | null = null

  try {
    await axios.request(options('POST', `/team`, {"gameId": id, "playersPerTeam": teamMax}))
      .then((response) => {
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

export const getTeam = async (id:string) => {
  let result: { code: number | any, data: Team | any } | null = null

  try {
    await axios.request(options('GET', `/team/${id}`, {}))
      .then((response) => {
        result = {
          code: response.status,
          data: new Team(response.data['_id'], response.data['name'], response.data['playerIds'], response.data['completedExerciseIds'], response.data['unlockedExerciseIds'], response.data['guessedLetters'])
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

export const getAnswers = async (id:string) => {
  let result: { code: number | any, data: Answer[] | any } | null = null

  try {
    await axios.request(options('GET', `/getallanswers/${id}`, {}))
      .then((response) => {
        let answers: Answer[] = []
        
        for (let i = 0; i < response.data.length; i++) {
          answers.push(new Answer(response.data[i]['_id'], response.data[i]['texts'], 
            response.data[i]['exerciseId'], response.data[i]['teamId'], response.data[i]['photos'])
          )
        }

        result = {
          code: response.status,
          data: answers
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