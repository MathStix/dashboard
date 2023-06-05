<script lang="ts" setup>
import Header from '../components/Header.vue';
import { getAll } from '@/assets/javascript/api/exerciseApi';
import { Exercise } from '@/assets/javascript/models/exercise';
import ExerciseCard from '@/components/ExerciseCard.vue';

const id:string | null = sessionStorage.getItem('user');
const result = await getAll(id!);
const exercises: Exercise[] = result?.data

let message = false
if(exercises.length > 0){
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
          <RouterLink :to="{name: 'addExercises'}" class="btn btn-main mt-4">
            <span>
              Add a new exercise
            </span>
          </RouterLink>
          </div>
        </div>
      </div>
      <section class="exercises">
        <div class="row">
          <div class="col-12">
            <h1>exercises</h1>
          </div>
          <div class="wrap" v-if="message">
            <ExerciseCard 
              v-for="exercise in exercises" 
              :key="exercise._id" 
              :exercise="exercise"
            />
          </div>
          <div class="wrap" v-else>
            <p>You do not have any exercises yet.</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>