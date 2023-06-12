<script lang="ts" setup>
import { getUser, updateUser } from "../assets/javascript/api/userApi";
import {validateEmail, errEmailEmp, errEmail, 
  errPassEmp, errPass, errSubmit, errConfirmPass, validateName, errName, errNameEmp
} from '../assets/javascript/validation';
import { Teacher, UpdateTeacher } from "../assets/javascript/models/user";
import Header from '../components/Header.vue';
</script>

<template>
  <Header/>
  <div class="page-wrap">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-12">
          <h1 class="text-center">Bewerk account</h1>
          <form @submit.prevent="update">
            <div class="form-group mt-3">
              <label>volledige naam</label>
              <input 
                type="text" 
                class="form-control" 
                placeholder="Vul je Volledige naam in." 
                required
                v-model="name"
                @blur="checkEmail"
                @keyup="checkEmail"
              >
              <div class="feedback" v-if="nameError">
                <span class="small">
                  {{ nameError }}
                </span>
              </div>
            </div>
            <div class="form-group mt-3">
              <label>Email</label>
              <input 
                type="email" 
                class="form-control" 
                placeholder="Vul je email in." 
                required
                v-model="email"
                @blur="checkEmail"
                @keyup="checkEmail"
              >
              <div class="feedback" v-if="emailError">
                <span class="small">
                  {{ emailError }}
                </span>
              </div>
            </div>
            <div class="form-group mt-4">
              <label>Nieuwe wachtwoord</label>
              <input 
                type="password" 
                class="form-control" 
                placeholder="Nieuwe wachtwoord"
                required
                v-model="password"
                @blur="checkPassword"
                @keyup="checkPassword"
              >
              <div class="feedback" v-if="passwordError">
                <span class="small">
                  {{ passwordError }}
                </span>
              </div>
            </div>
            <div class="form-group mt-4">
              <label>Bevestig Nieuwe wachtwoord</label>
              <input 
                type="password" 
                class="form-control" 
                placeholder="Bevestig Nieuwe wachtwoord"
                required
                v-model="confirmPassword"
                @blur="checkPassword"
                @keyup="checkPassword"
              >
              <div class="feedback" v-if="confirmError">
                <span class="small">
                  {{ confirmError }}
                </span>
              </div>
            </div>
            <div class="form-group mt-4">
              <label>Je huidige wachtwoord</label>
              <input 
                type="password" 
                class="form-control" 
                placeholder="Je huidige wachtwoord"
                required
                v-model="oldPass"
                @blur="checkPassword"
                @keyup="checkPassword"
              >
              <div class="feedback" v-if="oldPassError">
                <span class="small">
                  {{ oldPassError }}
                </span>
              </div>
            </div>
            <div class="btn-wrap">
              <button type="submit" class="btn btn-main mt-4">
                <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                  <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#fff" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                  </circle>
                  <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#fff" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
                  </circle>
                </svg>
                
                <span v-else>
                  Opslaan
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      teacher: null as Teacher | null,
      id: '',
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmError: '',
      oldPass: '',
      oldPassError: '',
      loading: false,
    }
  },
  async beforeMount() {
    const id:string | null = sessionStorage.getItem('user');
    let teacher: Teacher

    if(id){ 
      const result = await getUser(id);
      teacher = result?.data
      this.teacher = teacher;

      this.name = this.teacher.fullName!
      this.email = this.teacher.email!
    }
  },
  methods: {
    checkName(){
      this.nameError = this.name.length == 0 ? errNameEmp() : (
        validateName(this.name) ? '' : errName(this.name)
      )
    },
    checkEmail(){
      this.emailError = this.email.length == 0 ? errEmailEmp() : (
        validateEmail(this.email) ? '' : errEmail(this.email)
      )
    },
    checkPassword(){
      this.passwordError = this.password.length == 0 ? errPassEmp() : (
        this.password.length < 10 ? errPass() : ''
      )
    },
    checkConfirm(){
      this.confirmError = this.confirmPassword != this.password ? errConfirmPass() : ''
    },
    checkOldPassword(){
      this.oldPassError = this.oldPass.length == 0 ? errPassEmp() : ''
    },
    async update(){
      this.loading = true
      this.checkEmail()
      this.checkPassword()
      this.checkEmail()
      this.checkConfirm()
      this.checkOldPassword()

      if(!this.emailError && !this.passwordError && !this.confirmError 
        && !this.nameError && !this.oldPassError)
      {

        const reslut = await updateUser(new UpdateTeacher(this.teacher!._id!, this.name, 
          this.email, this.password, this.oldPass)
        )
        if(reslut?.code == 200){
          this.loading = false
          this.$router.push('account');
        }
      }
      this.loading = false
    }
  },
})
</script>