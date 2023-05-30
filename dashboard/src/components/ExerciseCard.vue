<script setup lang="ts">
import { Exercise } from '@/assets/javascript/models/exercise';

defineProps({
  exercise: {
    type: Exercise,
    required: true,
  }
});
</script>

<template>
  <div class="card">
    <div class="inner">
      <div class="img-wap">
        <img :src="exercise.getImage()" alt="game-img">
      </div>
      <p>{{ exercise.title }}</p>
      <p>{{ exercise.description }}</p>  
      <a class="btn btn-main mt-4">
        <span>
          View
        </span>
      </a>   
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/game-card.scss";
</style>