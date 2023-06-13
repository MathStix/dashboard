<script setup lang="ts">
import Header from '@/components/Header.vue';
import ExerciseCard from '@/components/ExerciseCard.vue';
import type { Course } from '@/assets/javascript/models/course';
import { useRoute } from 'vue-router';
import { getCourse } from '@/assets/javascript/api/courseApi';

const route = useRoute();
const reslut = await getCourse(route.params.id.toString())
const course: Course = reslut?.data
</script>

<template>
  <Header/>
  <section class="page-wrap">
    <div class="container-fluid pacer">
      <div class="row mt-5 pt-5">
        <div class="col-12">
          <h1>{{ course.title }}</h1>
          <p>{{ course.description }}</p>
        </div>
      </div>
      <div class="mt-5">
        <div class="d-flex mb-5">
          <h2>Opdrachten</h2>
          <RouterLink class="btn btn-main wide h-100 mx-5" :to="{name:'fillCourse', params:{id: course._id}}">
            <span>Bewerk opdrachten</span>
          </RouterLink>
        </div>
        <div class="row card-row">
          <div class="col-md-4 card-wrap" v-for="exercise in course.exercises" :key="exercise._id">
            <ExerciseCard 
              :exercise="exercise"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>