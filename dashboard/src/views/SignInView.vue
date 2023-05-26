<template>
  <div class="page-wrap">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-12">
          <h1 class="text-center">Sign in</h1>
          <form @submit.prevent="submit">
            <div class="form-group mt-3">
              <label for="exampleInputEmail1">Email address</label>
              <input 
                type="email" 
                class="form-control" 
                placeholder="Enter email" 
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
              <label for="exampleInputPassword1">Password</label>
              <input 
                type="password" 
                class="form-control" 
                placeholder="Password"
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
                  Submit
                </span>
              </button>
            </div>
          </form>
          <p class="mt-3">
            Dont have an account yet?
            <RouterLink :to="{name: 'SignUp'}">
              Sign up
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {validateEmail, errEmailEmp, errEmail, errPassEmp, errSubmit} from '../assets/javascript/validation';
import { signIn } from '../assets/javascript/api/userApi';
import { Teacher } from "../assets/javascript/models/user";

export default defineComponent({
  data() {
    return {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async submit(){
      this.loading = true;
      this.checkEmail();
      this.checkPassword();
      
      if(!this.emailError && !this.passwordError){
        const res = await signIn(new Teacher(null, '', this.email, this.password))
        if(res?.code == 200){
          sessionStorage.setItem('user', '1');
          this.loading = false;
          this.$router.push('home');
        }
        else{
          console.log('not submit')
          this.error = errSubmit();
        }
      }
      this.loading = false;
    },
    checkEmail(){
      this.emailError = this.email.length == 0 ? errEmailEmp() : (
        validateEmail(this.email) ? '' : errEmail(this.email)
      )
    },
    checkPassword(){
      this.passwordError = this.password.length == 0 ? errPassEmp() : ''
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/sign-in.scss';
</style>