<template>
  <div class="page-wrap">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <h1 class="text-center">Sign In</h1>
          <form>
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
                <span>
                  Submit
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
import {validateEmail, errEmailEmp, errEmail, errPassEmp} from '../assets/javascript/validation';

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
    submit(){
      console.log('submit');  
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