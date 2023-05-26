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