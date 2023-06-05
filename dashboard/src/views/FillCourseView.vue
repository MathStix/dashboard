<template>
  <Header/>
  <div v-auto-animate>
    <section class="page-wrap pt-5" v-if="course">
      <div class="container-fluid mt-5 pt-4 space">
        <div class="row">
          <div class="col-12">
            <h1>{{ course.title }}</h1>
            <p>{{ course.description }}</p>
          </div>
        </div>
        <div class="row">
          <h2>Exercises</h2>
          <div class="wrap d-flex" v-auto-animate>
            <ExerciseCard 
              v-for="exercise in course.exercises" 
              :key="exercise._id"
              :exercise="exercise"
              :removeAble="true"
              @removeFromCourse="removeExercise"
            />
          </div>
        </div>
        <div class="row" v-if="exercises">
          <h2>All Exercises</h2>
          <div class="wrap d-flex" v-auto-animate>
            <ExerciseCard 
              v-for="exercise in exercises" 
              :key="exercise._id"
              :exercise="exercise"
              :addable="true"
              @addToCourse="addNewExercise"
            />
          </div>
        </div>
      </div>
    </section>

    <div class="loading" v-if="loading">
      <div class="wrapper">
        <div class="inner">
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
          </div>

          <div class="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>

          <div class="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
        <div class="txt text-center mt-4">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addExercise, deleteExercise, getCourse } from '@/assets/javascript/api/courseApi';
import { getAll } from '@/assets/javascript/api/exerciseApi';
import type { Course } from '@/assets/javascript/models/course';
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue'
import type { Exercise } from '@/assets/javascript/models/exercise';
import Header from '../components/Header.vue';
import ExerciseCard from '@/components/ExerciseCard.vue';

import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      loading: false
    }
  },
  components: {
    Header, ExerciseCard
  },
  async setup() {
    const route = useRoute();
    const reslut = await getCourse(route.params.id.toString())
    const course: Ref<Course | null> = ref(reslut?.data)

    const res = await getAll(sessionStorage.getItem('user')!)
    const exercises: Ref<Exercise[] | null> = ref(res?.data)

    for(let i = 0; i < exercises.value!.length; i++){
      for(let j = 0; j < course.value!.exercises!.length; j++){
        if(exercises.value![i]._id == course.value!.exercises![j]._id){
          exercises.value?.splice(i, 1)
        }
      }
    }

    return {
      course, exercises
    }
  },
  methods: {
    async addNewExercise(id:string){
      this.loading = true
      await addExercise(this.course!._id!, id)
      this.rerender()
    },
    async removeExercise(id:string){
      this.loading = true
      await deleteExercise(this.course!._id!, id)
      this.rerender()
    },
    async rerender(){
      const res = await getCourse(this.course!._id!)
      this.course! = res?.data
      const result = await getAll(sessionStorage.getItem('user')!)
      this.exercises! = result?.data

      for(let i = 0; i < this.exercises!.length; i++){
        for(let j = 0; j < this.course!.exercises!.length; j++){
          if(this.exercises![i]._id == this.course!.exercises![j]._id){
            this.exercises?.splice(i, 1)
          }
        }
      }

      this.loading = false
      this.$forceUpdate();
    }
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/fillCourse.scss";
</style>