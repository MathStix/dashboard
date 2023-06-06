<template>
  <Header/>
  <section class="page-wrap">
    <div class="row">
      <div class="col-md-12">
        <a @click="startTheGame" class="btn btn-main">
          <span>Game starten</span>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>Join code: {{ game.code }}</h1>
        <p>Woord om te raden: {{ game.word }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <RouterLink class="btn btn-main" :to="{name:'fillCourse', params:{id: course._id}}">
          <span>Bewerk course</span>
        </RouterLink>
      </div>
    </div>
    <div class="row">
      <p>Opdrachten in het spel.</p>
      <div class="col-12">
        <ExerciseCard v-for="exercise in course.exercises" :exercise="exercise" :key="exercise._id" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getCourse } from '@/assets/javascript/api/courseApi';
import type { Course } from '@/assets/javascript/models/course';
import { getGame, startGame } from '@/assets/javascript/api/gameApi';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import type { Game } from '@/assets/javascript/models/game';
import ExerciseCard from '@/components/ExerciseCard.vue';

import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Header, ExerciseCard
  },
  async setup() {
    const route = useRoute();
    const reslutGame = await getGame(route.params.id.toString())
    const game: Game = reslutGame?.data

    const reslutCourse = await getCourse(game.courseId)
    const course: Course = reslutCourse?.data

    return {
      game, course
    }
  },
  methods: {
    async startTheGame(){
      const result = await startGame(this.game._id!)
      console.log(result?.code)
      console.log(result?.data)
    }
  },
})
</script>