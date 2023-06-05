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
      <a class="btn btn-main mt-4">
        <span>
          View
        </span>
      </a>   
    </div>
  </div>
</template>