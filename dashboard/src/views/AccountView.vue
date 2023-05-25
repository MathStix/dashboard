<script setup lang="ts">
import { getUser } from "../assets/javascript/api/userApi";
import { Teacher } from "../assets/javascript/models/user";
const id:string | null = sessionStorage.getItem('user');
let teacher: Teacher

if(id){
  const result = await getUser(id);
  teacher = result?.data
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1>
          Account info
        </h1>
      </div>
    </div>
    <div class="row">
      <p>name: {{ teacher.fullName }}</p>
      <p>email: {{ teacher.email }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>