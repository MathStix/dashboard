<template>
  <Header/>
  <div v-auto-animate>
    <section class="page-wrap" v-if="course">
      <div class="container-fluid pacer" >
        <div class="back" @click="() => { $router.back() }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
        <div class="row">
          <div class="col-12 mb-5">
            <h1>Opdrachten lijst: {{ course.title }}</h1>
            <p>Beschrijving: {{ course.description }}</p>
          </div>
        </div>
        <div class="row mb-5">
          <h2>Opdrachten in de lijst.</h2>
          <div class="wrap d-flex" v-auto-animate>
            <ExerciseCard 
              v-for="exercise in course.exercises" 
              :key="exercise._id"
              :exercise="exercise"
              :removeAble="true"
              @removeFromCourse="removeExercise"
              class="card-elm"
            />
          </div>
        </div>
        <div class="row mt-5" v-if="exercises">
          <h2>Alle opdrachten.</h2>
          <div class="wrap d-flex" v-auto-animate>
            <ExerciseCard 
              v-for="exercise in exercises" 
              :key="exercise._id"
              :exercise="exercise"
              :addable="true"
              @addToCourse="addNewExercise"
              class="card-elm"
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

    const indexes: number[] = []

    for(let i = 0; i < exercises.value!.length; i++){
      for(let j = 0; j < course.value!.exercises!.length; j++){
        if(exercises.value![i]._id == course.value!.exercises![j]._id){
          indexes.push(i)
          continue
        }
      }
    }

    for(let i = 0; i < indexes.length; i++){
      const newIndex = indexes[i] - i
      exercises.value?.splice(newIndex, 1)
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

      const indexes: number[] = []

      for(let i = 0; i < this.exercises!.length; i++){
        for(let j = 0; j < this.course!.exercises!.length; j++){
          if(this.exercises![i]._id == this.course!.exercises![j]._id){
            indexes.push(i)
            continue
          }
        }
      }

      for(let i = 0; i < indexes.length; i++){
        const newIndex = indexes[i] - i
        this.exercises?.splice(newIndex, 1)
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