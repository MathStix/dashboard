<script setup lang="ts">
import { getCourse } from '@/assets/javascript/api/courseApi';
import type { Course } from '@/assets/javascript/models/course';
import { Game } from '@/assets/javascript/models/game';
 
const props = defineProps({
  game: {
    type: Game,
    required: true,
  }
});

const result = await getCourse(props.game.courseId)
const course: Course = result?.data

</script>

<template>
  <div class="card">
    <div class="inner">
      <p>Game met opdrachtenlijst: {{ course.title }}</p>
      <RouterLink class="btn btn-main mt-4 wide" :to="{name: 'gameDetails', params:{id: game._id}}">
        <span>
          Bekijk game
        </span>
      </RouterLink>   
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/game-card.scss";
</style>