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
          <RouterLink :to="{name: 'addCourse'}" class="btn btn-main wide mt-4 mb-5">
            <span>
              Voeg een nieuwe opdrachten lijst toe.
            </span>
          </RouterLink>
          </div>
        </div>
      </div>
      <section class="exercises">
        <div class="row">
          <div class="col-12 mb-4 mt-5">
            <h1>Opdrachten lijsten.</h1>
          </div>
          <div class="wrap" v-if="message">
            <div class="row card-row">
              <div class="col-4 card-wrap"  v-for="course in courses" :key="course._id">
                <CourseCard  
                  :course="course"
                />
              </div>
            </div>
          </div>
          <div class="wrap" v-else>
            <p>Je hebt nog geen opdrachten lijsten.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>