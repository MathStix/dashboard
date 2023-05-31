<script setup lang="ts">
import Header from '../components/Header.vue';
import GameCard from '../components/GameCard.vue';
import { getUser } from "../assets/javascript/api/userApi";
import { getAllCourse } from '@/assets/javascript/api/courseApi';
import { Course } from '@/assets/javascript/models/course';
import {StartGameTemp} from '@/assets/javascript/api/exerciseApi' 

const id:string | null = sessionStorage.getItem('user');
const result = await getAllCourse(id!);
const courses: Course[] = result?.data

let message = false
if(courses.length <= 0){
  message = true
}
</script>

<template>
  <section>
    <Header/>
    <div class="page-wrap">
      <div class="container-fluid pacer">
        <div class="inner-wrap">
          <div class="btn-wrap">
            <a class="btn btn-main mt-4" @click="startGame">
              <span>
                Start new (HartCode) game
              </span>
            </a>
          </div>
          <section class="currgames game-slide">
            <h1>
              Ongoing game
            </h1>
            <div class="slide">
              <!-- <GameCard Descriptin="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed quidem, aliquid delectus atque ab, eligendi accusantium adipisci molestiae odit dolor aspernatur? Accusamus fugit est pariatur dolor porro explicabo mollitia ea placeat totam qui, sint cum tempore. Corrupti hic fugit, accusamus deleniti, nobis laboriosam minus quisquam sapiente tempora, quidem rem!" /> -->
            </div>
          </section>
          <section class="games game-slide">
            <h2>
              Courses
            </h2>
            <div class="slide" v-if="!message">
              <GameCard 
                v-for="course in courses" 
                :key="course._id" 
                :course="course" 
              />
            </div>
            <div class="slide" v-else>
              <p>You have not made any courses yet.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    async startGame(){
      const result = await StartGameTemp('64649b1ec128098626f846f9')
      console.log(result);
    },
  },
})
</script>

<style lang="scss" scoped>
  @import "../assets/styles/pages/home.scss";
</style>