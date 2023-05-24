import {checkUser} from './api/userApi';

export const routeGuard = async () => {
  const userId: string | null = JSON.parse(sessionStorage.getItem('user') || '{}');
  if(userId != null){
    if(await checkUser(userId)){
      return true;
    }
  }
  return false
}