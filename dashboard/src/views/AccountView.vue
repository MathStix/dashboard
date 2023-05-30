<script setup lang="ts">
import { getUser, deleteAccount } from "../assets/javascript/api/userApi";
import {validateEmail, errEmailEmp, errEmail, errPassEmp, errSubmit} from '../assets/javascript/validation';
import { Teacher } from "../assets/javascript/models/user";
import Header from '../components/Header.vue';

const id:string | null = sessionStorage.getItem('user');
let teacher: Teacher


if(id){
  const result = await getUser(id);
  teacher = result?.data
}
</script>

<template>
  <Header/>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1>
          Account info
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p>name: {{ teacher.fullName }}</p>
        <p>email: {{ teacher.email }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="btn-wrap">
        <RouterLink :to="{name: 'updateAccount'}" class="btn btn-main">
          edit account
        </RouterLink>
        </div>
      </div>
      <div class="col-md-6">
        <div class="btn-wrap">
          <a @click="openModel(teacher._id!.toString())" class="btn btn-main">delete account</a>
        </div>
      </div>
    </div>
  </div>

  <div class="wrapper" v-auto-animate>
    <div class="delete-modal" :class="modalToggle" @click="closeModal">
      <div @click.stop class="modal-wrap">
        <div class="custom-modal-head">
          <h5>Delete Account</h5>
          <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
        </div>
        <div class="custom-modal-body">
          <p>
            Are you sure you want to delete your account?
          </p>
        </div>
        <div class="custom-modal-footer">
          <div class="row">
            <div class="col-md-6">
              <button type="button" class="btn btn-custom" @click="closeModal">Cancel</button>
            </div>
            <div class="col-md-6">
              <button type="button" class="btn btn-custom-red" @click="openForm = true">Delete</button>
            </div>
          </div>
          <div class="form" v-if="openForm">
            <p>Sign in to confirm it is you.</p>
            <form @submit.prevent="deleteAccuont">
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
                    delete account
                  </span>
                </button>
              </div>
            </form>
          </div>
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
      id: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      modalToggle: 'hide',
      loading: false,
      openForm: false
    }
  },
  methods: {
    openModel(Id: string) {
      this.id = Id,
      this.modalToggle = 'open'
    },
    closeModal() {
      this.id = '',
      this.modalToggle = 'hide'
    },
    checkEmail(){
      this.emailError = this.email.length == 0 ? errEmailEmp() : (
        validateEmail(this.email) ? '' : errEmail(this.email)
      )
    },
    checkPassword(){
      this.passwordError = this.password.length == 0 ? errPassEmp() : ''
    },
    async deleteAccuont(){
      this.loading = true
      this.checkEmail()
      this.checkPassword()

      if(!this.emailError && !this.passwordError){
        teacher.email = this.email
        teacher.password = this.password
        const reslut = await deleteAccount(teacher)
        if(reslut?.code == 200){
          this.$router.push('signIn');
        }
      }
      this.loading = false
    }
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>