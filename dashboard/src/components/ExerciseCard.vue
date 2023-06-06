<script setup lang="ts">
import { Exercise } from '@/assets/javascript/models/exercise';

defineProps({
  exercise: {
    type: Exercise,
    required: true,
  },
  addable: {
    type: Boolean,
    required: false,
    default: false
  },
  removeAble: {
    type: Boolean,
    required: false,
    default: false
  }
});

</script>

<template>
  <div class="card">
    <div class="inner">
      <div class="img-wap">
        <img :src="exercise.getImage()" alt="game-img" v-if="exercise.photo">
        <img src="https://placehold.co/600x650" alt="game-img" v-else>
      </div>
      <p>{{ exercise.title }}</p>
      <p>{{ exercise.description }}</p>  
      <div class="wrap d-flex justify-contant-between">
        <RouterLink class="btn btn-main mt-4" :to="{name: 'exerciseDetail', params:{id: exercise._id}}">
          <span>
            Bekijk
          </span>
        </RouterLink>
        <a class="btn btn-main mt-4" v-if="addable" @click="$emit('addToCourse', exercise._id)">
          <span>
            Voeg to aan lijst
          </span>
        </a> 
        <a class="btn btn-main mt-4" v-if="removeAble" @click="$emit('removeFromCourse', exercise._id)">
          <span>
            Verwijder van lijst
          </span>
        </a>  
      </div> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/exercise-card.scss";
</style>