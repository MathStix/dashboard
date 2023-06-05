<template>
  <Header/>
  <section class="page-wrap" v-if="course">
    <div class="container-fluid space">
      <div class="row">
        <div class="col-12">
          <h1>{{ course.title }}</h1>
          <p>{{ course.description }}</p>
        </div>
      </div>
      <div class="row">
        <h2>Exercises</h2>
        <div class="wrap" v-auto-animate>
        
        </div>
      </div>
      <div class="row" v-if="exercises">
        <h2>All Exercises</h2>
        <div class="wrap" v-auto-animate>
        
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getCourse } from '@/assets/javascript/api/courseApi';
import { getAll } from '@/assets/javascript/api/exerciseApi';
import type { Course } from '@/assets/javascript/models/course';
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue'
import type { Exercise } from '@/assets/javascript/models/exercise';
import Header from '../components/Header.vue';
import ExerciseCard from '@/components/ExerciseCard.vue';

import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Header, ExerciseCard
  },
  async setup() {
    const route = useRoute();
    const reslut = await getCourse(route.params.id.toString())
    const course: Ref<Course | null> = ref(reslut?.data)

    const res = await getAll(sessionStorage.getItem('user')!)
    const exercises: Ref<Exercise[] | null> = ref(res?.data)

    return {
      course, exercises
    }
  }
})
</script>