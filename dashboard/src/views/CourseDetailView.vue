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
    <div class="row">
      <div class="col-12">
        <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
      </div>
    </div>
    <div class="row mt-5">
      <ExerciseCard 
        v-for="exercise in course.exercises" 
        :key="exercise._id"
        :exercise="exercise"
      />
    </div>
  </section>
</template>