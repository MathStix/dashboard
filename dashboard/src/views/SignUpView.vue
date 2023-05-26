<template>
    <div class="page-wrap">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-12">
                    <h1 class="text-center">Sign Up</h1>
                    <form @submit.prevent="submit">
                        <div class="form-group mt-3">
                        <label>Fullname</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Enter your full name" 
                            required
                            v-model="name"
                            @blur="checkName"
                            @keyup="checkName"
                        >
                        <div class="feedback" v-if="nameError">
                            <span class="small">
                            {{ nameError }}
                            </span>
                        </div>
                        </div>
                        <div class="form-group mt-3">
                        <label>Email address</label>
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
                        <label>Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="New password"
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
                        <label>Confirm password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="Confirm password"
                            required
                            v-model="confirmPassword"
                            @blur="checkConfirm"
                            @keyup="checkConfirm"
                        >
                        <div class="feedback" v-if="confirmError">
                            <span class="small">
                            {{ confirmError }}
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
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import {validateEmail, errEmailEmp, errEmail, 
  errPassEmp, errPass, errSubmit, errConfirmPass, validateName, errName, errNameEmp
} from '../assets/javascript/validation';
import { signUp } from '../assets/javascript/api/userApi';
import { Teacher } from "../assets/javascript/models/user";

export default defineComponent({
    data() {
        return {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmError: '',
            loading: false,
        }
    },
    methods: {
        checkEmail() {
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
        checkName(){
            this.nameError = this.name.length == 0 ? errNameEmp() : (
                validateName(this.name) ? '' : errName(this.name)
            )
        },
        async submit() {
            this.loading = true
            this.checkEmail()
            this.checkPassword()
            this.checkEmail()
            this.checkConfirm()

            if(!this.emailError && !this.passwordError && !this.confirmError && !this.nameError)
            {
                const reslut = await signUp(new Teacher(null, this.name, this.email, this.password))
                if(reslut?.code == 200){
                    console.log(reslut.data)
                    sessionStorage.setItem('user', reslut.data['_id']);
                    this.loading = false;
                    // this.$router.push('home');
                }
            }
            this.loading = false
        },
    },
})
</script>
  
<style lang="scss" scoped>
@import '@/assets/styles/pages/sign-up.scss';
</style>