<script setup lang="ts">
import Header from '../components/Header.vue';
import CourseCard from '@/components/CourseCard.vue';
import { getAllCourse } from '@/assets/javascript/api/courseApi';
import { Course } from '@/assets/javascript/models/course';
import { getGame } from '@/assets/javascript/api/gameApi';
import type { Game } from '@/assets/javascript/models/game';
import GameCard from '@/components/GameCard.vue';

const id:string | null = sessionStorage.getItem('user');
const result = await getAllCourse(id!);
const courses: Course[] = result?.data

const reslutGame = await getGame('64649b1ec128098626f846f9')
const game: Game = reslutGame?.data

let message = true
if(courses.length > 0){
  message = false
}
</script>

<template>
  <section>
    <Header/>
    <div class="page-wrap">
      <div class="container-fluid pacer">
        <div class="inner-wrap">
          <section class="currgames game-slide">
            <h1>
              Spel.
            </h1>
            <div class="slide">
              <div class="row card-row w-100">
                <div class="col-md-4 card-wrap">
                  <GameCard :game="game" />
                </div>
              </div>
            </div>
          </section>
          <section class="games game-slide">
            <h2>
              Opdrachten lijst.
            </h2>
            <div class="slide" v-if="!message">
              <div class="row card-row w-100">
                <div class="col-md-4 card-wrap" v-for="course in courses" :key="course._id" >
                  <CourseCard
                    class="mt-4" 
                    :course="course" 
                  />
                </div>
              </div>
            </div>
            <div class="slide" v-else>
              <p>Je hebt nog geen opdrachten lijst.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>