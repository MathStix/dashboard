const reName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/;
const reEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const reTitle = /^[a-zA-Z0-9_ #--():]*$/;
const reDescription = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-?!"()#&+—’”“]*$/;
const reId = /^[0-9]*$/;
const extentions = ["png","jpg","jpeg"]

//validation
export const validateName = (name: string):Boolean => {
  return reName.test(name);
}
export const validateTitle = (title: string):Boolean => {
  return reTitle.test(title);
}
export const validateEmail = (email: string):Boolean => {
  return reEmail.test(email);
}
export const validateDescription = (description: string):Boolean => {
  return reDescription.test(description);
}
export const validateId = (id: string):Boolean => {
  return reId.test(id);
}
export const validateFile = (file: any):Boolean => {
  for(let ext of extentions){
    if(file == ext)
    {
      return true
      break;
    }
  }
  return false
}

export const errSubmit = ():string => {return 'One or more fields had an error.';}
export const errNameEmp = ():string => { return 'Name can not be empty.' }
export const errName = (e:string):string => { return `${e} is not a name.` }
export const errTitleEmp = ():string => { return 'Title can not be empty.' }
export const errTitle = (e:string):string => { return `${e} is not a proper title.` }
export const errEmailEmp = ():string => { return 'Email can not be empty.' }
export const errEmail = (e:string):string => { return `${e} is not an email.` }
export const errPassEmp = ():string => { return 'Password can not be empty.'}
export const errPass = ():string => { return 'Password must be at least 10 characters long.'}
export const errConfirmPass = ():string => { return 'Confirm password must match.'}
export const errDescriptionEmp = ():string => { return 'Description can not be empty.' }
export const errDescription = (e:string):string => { return `${e} is not a description.` }
export const errImageEmp = ():string => { return 'Image can not be empty.' }
export const errImage = ():string => { return `The given file in not an image.` }