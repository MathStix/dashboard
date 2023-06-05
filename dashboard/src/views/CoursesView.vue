<script lang="ts" setup>
import { getAllCourse } from '@/assets/javascript/api/courseApi';
import Header from '../components/Header.vue';
import type { Course } from '@/assets/javascript/models/course';
import CourseCard from '@/components/CourseCard.vue';

const id:string | null = sessionStorage.getItem('user');
const result = await getAllCourse(id!)
const courses:Course[] = result?.data

let message = false
if(courses.length > 0){
  message = true
}
</script>

<template>
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer mt-5 pt-3">
      <div class="row">
        <div class="col-12">
          <div class="btn-wrap">
          <RouterLink :to="{name: 'addCourse'}" class="btn btn-main mt-4">
            <span>
              Add a new course
            </span>
          </RouterLink>
          </div>
        </div>
      </div>
      <section class="exercises">
        <div class="row">
          <div class="col-12">
            <h1>courses</h1>
          </div>
          <div class="wrap" v-if="message">
            <CourseCard 
              v-for="course in courses" 
              :key="course._id" 
              :course="course"
            />
          </div>
          <div class="wrap" v-else>
            <p>You do not have any courses yet.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>