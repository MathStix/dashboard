import { getCourse } from './api/courseApi';
import { getExercise } from './api/exerciseApi';
import {checkUser} from './api/userApi';

export const routeGuard = async () => {
  const idRaw = sessionStorage.getItem('user')
  if(idRaw != null){
    if(await checkUser(idRaw)){
      return true;
    }
  }
  return false
}

export const checkCourse = async (id: string) => {
  const result = await getCourse(id);
  if(result?.code == 200){
    return true
  }
  return false
}

export const checkExercise = async (id: string) => {
  const result = await getExercise(id);
  if(result?.code == 200){
    return true
  }
  return false
}