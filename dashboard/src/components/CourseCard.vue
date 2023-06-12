<script setup lang="ts">
import { Course } from '@/assets/javascript/models/course';

defineProps({
  course: {
    type: Course,
    required: true,
  }
})
</script>

<template>
  <div class="card" v-if="course">
    <div class="inner">
      <p>{{ course.title }}</p>
      <p>{{ course.description }}</p>
      <RouterLink class="btn btn-main mt-4" :to="{name: 'courseDetail', params:{id: course._id}}">
        <span>
          Bekijk
        </span>
      </RouterLink>  
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/game-card.scss";
</style>