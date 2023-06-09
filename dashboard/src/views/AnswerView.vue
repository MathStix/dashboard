<script lang="ts" setup>
import { getAnswers } from '@/assets/javascript/api/gameApi';
import type { Answer } from '@/assets/javascript/models/answer';
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const reslut = await getAnswers(route.params.id.toString())
const answers: Answer[] = reslut?.data

for (let i = 0; i < answers.length; i++) {
  await answers[i].getExercise()
}
</script>

<template>
<Header/>
<section class="page-wrap" v-if="answers">
  <div class="container-fluid">
    <div class="back" @click="() => { $router.back() }">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </div>
    <div class="answer-card" v-for="answer in answers" :key="answer._id">
      <p><b>{{ answer.exercise!.title }}</b></p>
      <p>{{ answer.exercise!.description }}</p>
      <div class="text" v-if="answer.texts[0].length > 2">
        <span v-for="text in answer.texts">{{ text }}</span>
      </div>
      <div class="photo" v-else>
        <img v-for="img in answer.photos" :src="answer.getImage(img)" >
      </div>
    </div>
  </div>
</section>
</template>